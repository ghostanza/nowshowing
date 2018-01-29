const http = require('http');
const https = require('https');
const args = process.argv.slice(2);
let flags = [];
let functions = {
  b: brattle,
  c: coolidge,
  k: kendall,
  s: somerville
}
for (i in args) {
  args[i][0]=='-' && flags.push(...args[i].slice(1).split(''))
}
if(flags.length){
  for(f in flags){
    if(functions[flags[f]]){
      functions[flags[f]].call();
    }
  }
}
else{
  for(fn in functions){
    functions[fn].call();
  }
}

function somerville(){
  let som = ' ';
  http.get('http://somervilletheatre.com/', (res) => {
    res.on('data', (c)=>{
      som+=`${c}`;
    }).on('end', ()=>{
      let somMovieMarkup = som.match(/show\-name.*?movie.*?\<\/div/g);
      console.log("\n==================\n  SOMERVILLE:\n==================");
      for(let i in somMovieMarkup){
        let somTitleReg = new RegExp('show-name.*?>(.*?)<\/a', 'g');
        let somTimeReg = new RegExp('uppercase;">(.*?)<\/a', 'gi');
        let somTitleMatch = somTitleReg.exec(somMovieMarkup[i]);
        if(somTitleMatch && somTitleMatch.length > 1){
          console.log(`  ${somTitleMatch[1]}:`)
          while(result = somTimeReg.exec(somMovieMarkup[i])){
            console.log(`  ${result[1]}`);
          }
          console.log('----------------');
        }
      }
    });
  });
}
function brattle(){
  let br = ' ';
  http.get('http://www.brattlefilm.org/', (res) => {
    res.on('data', (c) => {
        br+=`${c}`;
    }).on('end', ()=>{
      br = br.replace(/\n/g, '');
      console.log("\n==================\n  BRATTLE:\n==================")
      let brMovieMarkup = br.match(/entry-content.*?\<\/div/g);
      let brTitleReg = new RegExp('post-title.*?\<a.*?\>(.*?)\<\/a','g');
      let brTimeReg = new RegExp('post-meta.*?at.*?>(.*?)\<\/li','g');
      for(let k in brMovieMarkup){
        let brTimeMatch = brTimeReg.exec(brMovieMarkup[k]);
        if(brTimeMatch && brTimeMatch.length > 1){
          let brTitleMatch = brTitleReg.exec(brMovieMarkup[k]);
          if(brTitleMatch && brTitleMatch.length > 1);
          console.log(`  ${brTitleMatch[1]}`);
          console.log(`  ${brTimeMatch[1].replace(/^[\s]/,'')}`);
          console.log('----------------');
        }
      }
    });
  });
}

function coolidge(){
  let co = ' ';
  http.get('http://www.coolidge.org/', (res) => {
    res.on('data', (c) => {
        co+=`${c}`;
    }).on('end', ()=>{
      co = co.replace(/[\n\t]/g, '');
      console.log("\n==================\n  COOLIDGE:\n==================");
      let coMovieMarkup = co.match(/title-list-item.*?<hr/g);
      let coTimeMatch;
      let coTitleReg = new RegExp('film-event-title.*?\<a.*?\>(.*?)\<\/a','g');
      let coTimeReg = new RegExp('on-sale.*?>(.*?)\<\/','g');
      for(let ci in coMovieMarkup){
        let coTitleMatch = coTitleReg.exec(coMovieMarkup[ci]);
        if(coTitleMatch && coTitleMatch.length > 1){
          console.log(`  ${coTitleMatch[1].toUpperCase()}`);
          while(coTimeMatch = coTimeReg.exec(coMovieMarkup[ci])){
            if(coTimeMatch && coTimeMatch.length > 1){
              console.log(`  ${coTimeMatch[1]}`);
            }
          }
          console.log('----------------');
        }
      }
    });
  });
}

function kendall(){
  let ken = ' ';
  let date = new Date().toISOString().slice(0,10);
  https.get('https://www.landmarktheatres.com/boston/kendall-square-cinema', (res) => {
    res.on('data', (c) => {
      ken+=`${c}`;
    }).on('end', ()=>{
      console.log("\n==================\n  KENDALL:\n==================")
      ken = ken.replace(/[\n\t]/g, '');
      let k = ken.match(/filmData.*?[\s\S]*?\}\]\;/g)[0];
      if(k.length){
        k = k.replace('filmData = ', '');
        k = k.substr(0,k.length-1);
        k = k.replace("\\'", '');
        k = k.replace(/\<.*?\>/g, '');
      }
      try{
        let p = JSON.parse(k);
        if(p && p.length){
          p.forEach((i) => {
            for(t in i['Sessions']){
              let s = i['Sessions'][t];
              if(s['NewDate'] == date){
                console.log(`  ${i['Title']}${i['Cert'] ? ` (${i['Cert']})` : ''}`);
                for(let m in s['Times']){
                  console.log(`  ${s['Times'][m]['StartTime']}`);
                }
                console.log('----------------');
              }
            }
          });
        }
      }
      catch(err){
        console.log("ERROR PARSING");
      }
    });
  });
}
