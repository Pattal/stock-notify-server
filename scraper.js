const express = require('express')
const app = express();
const port = 3000;
const cheerio = require("cheerio");
const axios = require('axios');


getData = () => {
    axios.get('http://biznes.pap.pl/pl/reports/espi/all,0,0,0,1')
        .then(res => {
            const $ = cheerio.load(res.data);
            let info = [];

            $('.inf').each((index, el) => {
                info = {};
                let name = $(el).children().first().text().trim();
                let number = $(el).find('td:nth-child(2)').text().trim();
                let company = $(el).find('td:nth-child(3)').text().trim()
                let title = $(el).children().last().text().trim();
                let url = $(el).find('td:nth-child(4)').find('a').attr('href');

                (async () => {
                    let content = await getInfo(url);
                    info = {
                        name: name,
                        number: number,
                        company: company,
                        title: title,
                        url: url,
                        content: content
                    }
                    axios.post('https://stocknotify-8a327.firebaseio.com/info.json', info)
                        .then(response => {
                            console.log('Done!');

                    })
                    .catch(err => console.log(err));
                  })()
                
                

                //console.log(info);

                    
                



            });
        })
}



async function getInfo (link) {
    let content = [];
    
    let info = await axios.get(link)
            .then( res => {
                const $ = cheerio.load(res.data);
                
                let i = 0;
                $('.nTekst').each((index, el) => {
                    
                    content[index] = $(el).find('td:nth-child(2)').text().trim();
                    //console.log(content[index]);
                });

                //console.log(content[10]);
                return content[10];
            })

//console.log(info);
return info;
}


getData();

//setInterval(getData, 5000);           


 
            

            
// getInfo = (link) => {
//     axios.get('http://biznes.pap.pl/espi/pl/reports/view/2,457236')
//             .then( res => {
//                 const $ = cheerio.load(res.data);
//                 const content = '';
//                 let i = 0;
//                 $('tr').each((index, el) => {
//                     if($(el).children().text().trim() === 'Treśc raportu:') {
//                         while($(el).next().children().text().trim() !== '_pełna nazwa emitenta_' ){
//                             //     i++;
//                             //     console.log(i)
        
//                             }
//                     }
                    
                    

//                     // if($(el).children().text().trim().toLocaleLowerCase() == 'treść raportu:' ) {
                        
//                     //     content += $(el).children().text().trim() + '/n';
                        
//                     // }
//                 });


//             })
// }
   

