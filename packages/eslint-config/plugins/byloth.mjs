const bylothPlugin = {
  rules: {
    "padded-blocks": {
      meta: {
        type: "layout",
        docs: {
          description: "Disallow padded blocks, except require one before closing brace in non-last callbacks",
          recommended: false
        },
        fixable: "whitespace",
        schema: [],
        messages: {
          missingBlankLineBeforeClose: "Block must end with a blank line before closing brace in non-last callback arguments.",
          unexpectedBlankLineAfterOpen: "Block must not start with a blank line.",
          unexpectedBlankLineBeforeClose: "Block must not end with a blank line."
        }
      },
      create(context)
      {
        const { sourceCode } = context;

        const getLineIndentation = (line, column) => line.slice(0, column);
        const getBlockTokens = (node) =>
        {
          if ((node.body.length === 0) || (node.loc.start.line === node.loc.end.line)) { return null; }

          const openingBrace = sourceCode.getFirstToken(node);
          const closingBrace = sourceCode.getLastToken(node);
          const firstContentToken = sourceCode.getFirstToken(node, { skip: 1, includeComments: true });
          const lastContentToken = sourceCode.getTokenBefore(closingBrace, { includeComments: true });

          if (!(openingBrace) || !(closingBrace) || !(firstContentToken) || !(lastContentToken)) { return null; }

          return {
            closingBrace,
            firstContentToken,
            lastContentToken,
            openingBrace
          };
        };

        const hasBlankLineBeforeClosingBrace = ({ closingBrace, lastContentToken }) =>
        {
          return ((closingBrace.loc.start.line - lastContentToken.loc.end.line) > 1);
        };
        const hasBlankLineAfterOpeningBrace = ({ openingBrace, firstContentToken }) =>
        {
          return ((firstContentToken.loc.start.line - openingBrace.loc.end.line) > 1);
        };

        const isCallbackWithTrailingArguments = (node) =>
        {
          const { parent } = node;

          if (!(parent)) { return false; }
          if ((parent.type !== "CallExpression") && (parent.type !== "NewExpression")) { return false; }

          const index = parent.arguments.indexOf(node);
          return ((index !== -1) && (index < (parent.arguments.length - 1)));
        };

        const fixBlankLineBeforeClosingBrace = (tokens, requireBlankLine) =>
        {
          const range = [tokens.lastContentToken.range[1], tokens.closingBrace.range[0]];

          const closingLine = sourceCode.lines[tokens.closingBrace.loc.start.line - 1] ?? "";
          const closingIndentation = getLineIndentation(closingLine, tokens.closingBrace.loc.start.column);
          const replacement = requireBlankLine ? `\n\n${closingIndentation}` : `\n${closingIndentation}`;

          return (fixer) => fixer.replaceTextRange(range, replacement);
        };
        const fixNoBlankLineAfterOpeningBrace = (tokens) =>
        {
          const range = [tokens.openingBrace.range[1], tokens.firstContentToken.range[0]];

          const firstLine = sourceCode.lines[tokens.firstContentToken.loc.start.line - 1] ?? "";
          const firstIndentation = getLineIndentation(firstLine, tokens.firstContentToken.loc.start.column);

          return (fixer) => fixer.replaceTextRange(range, `\n${firstIndentation}`);
        };

        const BlockStatement = (node) =>
        {
          const tokens = getBlockTokens(node);
          if (!(tokens)) { return; }

          if (hasBlankLineAfterOpeningBrace(tokens))
          {
            context.report({
              fix: fixNoBlankLineAfterOpeningBrace(tokens),

              messageId: "unexpectedBlankLineAfterOpen",
              node: node
            });
          }

          const { parent } = node;

          const isFunction = ["ArrowFunctionExpression", "FunctionExpression"].includes(parent?.type);
          const mustHaveBlankLineBeforeClose = ((isFunction) && isCallbackWithTrailingArguments(parent));
          const hasTrailingBlankLine = hasBlankLineBeforeClosingBrace(tokens);

          if ((mustHaveBlankLineBeforeClose) && !(hasTrailingBlankLine))
          {
            context.report({
              fix: fixBlankLineBeforeClosingBrace(tokens, true),

              messageId: "missingBlankLineBeforeClose",
              node: node
            });
          }
          else if (!(mustHaveBlankLineBeforeClose) && (hasTrailingBlankLine))
          {
            context.report({
              fix: fixBlankLineBeforeClosingBrace(tokens, false),

              messageId: "unexpectedBlankLineBeforeClose",
              node: node
            });
          }
        };

        return { BlockStatement };
      }
    }
  }
};

export default bylothPlugin;
