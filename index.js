const compiler = require('json-to-css-fullsnack');


module.exports = {
    createHtmlArray: (content) => {
        let res = [];
        content.map(el => {
            const tags = createTag(el.tag);
            res.push(tags[0]);
            (typeof(el.content) === 'object') ? res.push(createHtmlArray(el.content).join( ' ' )) : res.push(el.content);
            res.push(tags[1])
        });
        return res;
    },
    createTag: (tag) => {
        return [`<${tag}>`, `</${tag}>`];
    },
    createHtmlString: (arr) => {
        return createHtmlArray(arr).join('\n');
    }     
}


const data = {
    content: [
        {
            tag: 'article',
            content: [
                {
                    tag: 'div1',
                    content: [
                        {
                            tag: 'p',
                            content: 'this is a tag skdjflkj'
                        },
                        {
                            tag: 'a',
                            content: 'Click This!'
                        }
                    ]
                }, 
                {
                    tag: 'div2',
                    content: 'another div'
                }
            ]
        }
    ]
}

console.log(createHtmlString(data.content));
console.log(compiler);