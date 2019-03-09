const htmlCompiler = require( './index' );

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
                            href: 'https://google.com',
                            target: '_blank',
                            style: {
                                inlineStyles: false,
                                margin: {
                                    bottom: '20px',
                                    top: '20px'
                                }
                            },
                            content: 'Click This!'
                        }
                    ]
                }, 
                {
                    tag: 'div2',
                    content: [
                        {
                            tag: 'b',
                            content: 'This strong'
                        }
                    ]
                }
            ]
        }
    ]
}

console.log(htmlCompiler.createHtmlString(data.content));