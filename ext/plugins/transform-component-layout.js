function TransformComponentLayout() {
  this.syntax = null;
}

TransformComponentLayout.prototype.transform = function TransformComponentLayout_transform(ast) {
  var Walker = this.syntax.Walker;

  var pragma = getComponentPragma(ast);
  if (pragma) {
    var walker = new Walker();
    walker.visit(ast, function(node) {
      if (node.type === 'ElementNode') {
        var attributes = node.attributes;
        for (var i = 0; i < attributes.length; i++) {
          if (attributes[i].name === 'class') {
            processClassAttrNode(attributes[i], pragma.name);
            break;
          }
        }
      }
    });
  }

  return ast;
};

function processClassAttrNode(attr, name) {
  if (attr.value.type === 'TextNode') {
    attr.value.chars = prependComponentName(attr.value.chars, name);
  }
}

function prependComponentName(classString, name) {
  return classString
    .split(' ')
    .map(function(c) { return c ? name + '-' + c : c; })
    .join(' ');
}

var COMPONENT_PRAGMA_REGEXP = /\s*@component:([\w-]+)/;

function getComponentPragma(ast) {
  var firstNode = ast.body[0];
  if (firstNode.type === 'CommentStatement') {
    var match = COMPONENT_PRAGMA_REGEXP.exec(firstNode.value);
    if (match) {
      ast.body.splice(0, 1);
      return { name: match[1] };
    }
  }
}

module.exports = TransformComponentLayout;
