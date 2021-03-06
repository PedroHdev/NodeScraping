const fileGetContents = require('file-get-contents')
const JSDOM = require('jsdom').JSDOM
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const app = {
    async getData(search){
        const page = await fileGetContents(`https://www.google.com/search?q=${search}`)
        return this.filter(page)
    },
    async filter(page){

        let dom = await new JSDOM(page)

        const document = await dom.window.document

        let selector = 'BNeawe s3v9rd AP7Wnd'

        let length = await document.getElementsByClassName(selector).length

        for(let i = 0; i < length; i++){

            if(document.getElementsByClassName(selector)[i].textContent.indexOf("Wikipédia") > -1){
                return '\033[1;33m'+document.getElementsByClassName(selector)[i].textContent+'\033[0m'
            }
        }

    }

}



rl.question("What are you thinking?\n", function(search) {
    app.getData(search).then((result) => {
        if(result == undefined){
            console.log('\033[0;31mThere is no information in the wikipedia about the term\033[0m')
        }else{
            console.log(result)
        }
        rl.close()
    }).catch((err) => {
        console.log(err)
        rl.close()
    })
});


