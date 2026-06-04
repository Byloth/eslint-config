const bylothPlugin = {
  rules: {
    "padded-blocks": {
      meta: {
        type: "layout",
        docs: {
          description: "Disallow padded blocks, except require one before a closing bracket that is buried by trailing code on the same line",
          recommended: false
        },
        fixable: "whitespace",
        schema: [],
        messages: {
          missingBlankLineBeforeClose: "Block must end with a blank line before the closing bracket when it is followed by trailing code on the same line.",
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
          if (node.loc.start.line === node.loc.end.line) { return null; }

          const openingBrace = sourceCode.getFirstToken(node);
          const closingBrace = sourceCode.getLastToken(node);

          if (!(openingBrace) || !(closingBrace)) { return null; }

          const firstContentToken = sourceCode.getTokenAfter(openingBrace, { includeComments: true });
          const lastContentToken = sourceCode.getTokenBefore(closingBrace, { includeComments: true });

          if (!(firstContentToken) || !(lastContentToken)) { return null; }
          if (firstContentToken === closingBrace) { return null; }

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

        const getLineEndColumn = (lineNumber) =>
        {
          return (sourceCode.lines[lineNumber - 1] ?? "").length;
        };
        const getExtraBlankLinesLocation = (startLine, endLine) =>
        {
          if (startLine > endLine) { return null; }

          return {
            end: { column: getLineEndColumn(endLine), line: endLine },
            start: { column: 0, line: startLine }
          };
        };
        const getUnexpectedBlankLineAfterOpenLocation = ({ openingBrace, firstContentToken }) =>
        {
          return getExtraBlankLinesLocation((openingBrace.loc.end.line + 1), (firstContentToken.loc.start.line - 1));
        };
        const getBlankLineBeforeCloseLocation = ({ closingBrace, lastContentToken }, requireBlankLine) =>
        {
          if (requireBlankLine)
          {
            return {
              end: { ...closingBrace.loc.start },
              start: { column: 0, line: closingBrace.loc.start.line }
            };
          }

          return getExtraBlankLinesLocation((lastContentToken.loc.end.line + 1), (closingBrace.loc.start.line - 1));
        };

        const isFunctionExpression = (node) =>
        {
          return ((node?.type === "ArrowFunctionExpression") || (node?.type === "FunctionExpression"));
        };

        const getSubjectExpression = (node) =>
        {
          let subject = node;

          if ((subject.type === "BlockStatement") && isFunctionExpression(subject.parent)) { subject = subject.parent; }

          while ((subject.parent?.type === "ArrowFunctionExpression") && (subject.parent.body === subject))
          {
            subject = subject.parent;
          }

          return subject;
        };

        const isInTrailingPosition = (node) =>
        {
          const { parent } = node;
          if (!(parent)) { return false; }

          switch (parent.type)
          {
            case "CallExpression":
            case "NewExpression":
            {
              const index = parent.arguments.indexOf(node);
              if (index !== -1) { return (index < (parent.arguments.length - 1)); }

              return (node === parent.callee);
            }

            case "ArrayExpression":
            {
              const index = parent.elements.indexOf(node);
              return ((index !== -1) && (index < (parent.elements.length - 1)));
            }

            case "Property":
            {
              const object = parent.parent;
              if ((node !== parent.value) || (object?.type !== "ObjectExpression")) { return false; }

              const index = object.properties.indexOf(parent);
              return ((index !== -1) && (index < (object.properties.length - 1)));
            }

            case "MemberExpression":
              return (node === parent.object);

            case "TSAsExpression":
            case "TSSatisfiesExpression":
              return (node === parent.expression);

            case "BinaryExpression":
            case "LogicalExpression":
              return (node === parent.left);

            case "ConditionalExpression":
              return ((node === parent.test) || (node === parent.consequent));

            default:
              return false;
          }
        };

        const isClosingBraceBuried = (closingBrace) =>
        {
          let nextToken = sourceCode.getTokenAfter(closingBrace);
          if (nextToken && (nextToken.value === ",")) { nextToken = sourceCode.getTokenAfter(nextToken); }

          return ((!!nextToken) && (nextToken.loc.start.line === closingBrace.loc.start.line));
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

        const checkNode = (node) =>
        {
          const tokens = getBlockTokens(node);
          if (!(tokens)) { return; }

          if (hasBlankLineAfterOpeningBrace(tokens))
          {
            const location = getUnexpectedBlankLineAfterOpenLocation(tokens);

            context.report({
              fix: fixNoBlankLineAfterOpeningBrace(tokens),
              loc: location,

              messageId: "unexpectedBlankLineAfterOpen"
            });
          }

          const subject = getSubjectExpression(node);
          const mustHaveBlankLineBeforeClose = (isInTrailingPosition(subject) && isClosingBraceBuried(tokens.closingBrace));
          const hasTrailingBlankLine = hasBlankLineBeforeClosingBrace(tokens);

          if ((mustHaveBlankLineBeforeClose) && !(hasTrailingBlankLine))
          {
            const location = getBlankLineBeforeCloseLocation(tokens, true);

            context.report({
              fix: fixBlankLineBeforeClosingBrace(tokens, true),
              loc: location,

              messageId: "missingBlankLineBeforeClose"
            });
          }
          else if (!(mustHaveBlankLineBeforeClose) && (hasTrailingBlankLine))
          {
            const location = getBlankLineBeforeCloseLocation(tokens, false);

            context.report({
              fix: fixBlankLineBeforeClosingBrace(tokens, false),
              loc: location,

              messageId: "unexpectedBlankLineBeforeClose"
            });
          }
        };

        return {
          ArrayExpression: checkNode,
          BlockStatement: checkNode,
          ObjectExpression: checkNode
        };
      }
    }
  }
};

export default bylothPlugin;
