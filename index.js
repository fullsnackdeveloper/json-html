const cssCompiler = styles => {
  const component = [];
  parser = (obj, prefix) => {
    Object.entries(obj).map(entry => {
      if (entry[0] !== "inlineStyles") {
        let addedPrefix = prefix ? prefix + "-" + entry[0] : entry[0];
        if (typeof entry[1] === "object") {
          parser(entry[1], addedPrefix);
        } else {
          if (entry[1] !== "")
            return component.push(addedPrefix + ": " + entry[1] + ";");
          return;
        }
      } else {
        return;
      }
    });
  };
  parser(styles);
  if (styles.inlineStyles) {
    return 'style="' + component.join(" ") + '"';
  } else {
    component.unshift("{");
    component.push("}");
    return component.join(" ");
  }
};

module.exports = {
  createHtmlArray: content => {
    let res = [];
    content.map(el => {
      const tags = module.exports.createTag(el);
      res.push(tags[0]);
      typeof el.content === "object"
        ? res.push(module.exports.createHtmlArray(el.content).join(""))
        : res.push(el.content);
      res.push(tags[1]);
    });
    return res;
  },
  createTag: el => {
    let properties = [],
      css;
    Object.entries(el).map(entry => {
      switch (entry[0]) {
        case "content":
          break;
        case "tag":
          break;
        case "style":
          if (entry[1].inlineStyles) {
            properties.push(cssCompiler(entry[1]));
          } else {
            css = `${el.tag}: ${cssCompiler(entry[1])}`;
          }
          break;
        default:
          properties.push(`${entry[0]}="${entry[1]}"`);
          break;
      }
    });
    return properties.length > 0
      ? [`<${el.tag} ${properties.join(" ")}>`, `</${el.tag}>`]
      : [`<${el.tag}>`, `</${el.tag}>`];
  },
  createHtmlString: data => {
    let formatedHtml = module.exports.createHtmlArray(data);
    return { html: formatedHtml.join(""), css: formatedData.css.join("") };
  }
};
