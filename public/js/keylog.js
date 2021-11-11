var records = [];
records.splice(0);


document.addEventListener('keydown', (event) => {
  var now = new Date(); //日付取得
  var keyName = event.key; //押されたキーの取得

  // 西暦
  var yy = now.getFullYear();
  // 月(月のデータは「０～１１」が格納されてるので１を足してます)
  var mm = now.getMonth() + 1;
  // 日付
  var dd = now.getDate();
  // 時間
  var h = now.getHours();
  // 分数
  var m = now.getMinutes();
  // 秒数
  var s = now.getSeconds();
  // ミリ秒
  var ms = now.getMilliseconds()

  //date要素の取得・コンソールに表示

   if (event.ctrlKey) {
    //  console.log(`${yy} 年 ${mm} 月 ${dd} 日 ${h} : ${m} : ${s} : ${ms}`);
    //  console.log(`keydown:Ctrl + ${keyName}`);
     var add1 = [`${yy} 年 ${mm} 月 ${dd} 日 ${h} : ${m} : ${s} : ${ms}`, `keydown:Ctrl + ${keyName}`];//配列
     records.push(add1);
   } else if (event.shiftKey) {
    //  console.log(`${yy} 年 ${mm} 月 ${dd} 日 ${h} : ${m} : ${s} : ${ms}`);
    // console.log(`keydown:Shift + ${keyName}`);
    var add2 = [`${yy} 年 ${mm} 月 ${dd} 日 ${h} : ${m} : ${s} : ${ms}`, `keydown:Shift + ${keyName}`];
    records.push(add2);
   } else {
    //  console.log(`${yy} 年 ${mm} 月 ${dd} 日 ${h} : ${m} : ${s} : ${ms}`);
    //  console.log(`keydown:${keyName}`);
     var add3 = [`${yy} 年 ${mm} 月 ${dd} 日 ${h} : ${m} : ${s} : ${ms}`, `keydown:${keyName}`];
     records.push(add3);
   }

 });

 function createAndDownloadCsv() {

  //配列要素を文字列変換
  var str = "";
  var len_day = Object.keys(records[0]).length;
  for(var i = 0; i < len_day; i++){
    if(i==0){
      str += "Temp," + records[0][i]+",";
    }else if(i == len_day-1){
      str += records[0][i]+"\n"; //Satで改行する
    }else{
      str += records[0][i]+","; //カンマで区切る
    }
  }
  
  var len_element = Object.keys(records).length;
  for(var i = 0; i < len_element-1; i++){ //観測地域数分ループ
    str+=records[i+1][0]+",";
    var len_Data =Object.keys(records[i+1][1]).length;
    for(var j=0; j < len_Data; j++){
      if(j == len_Data-1){
        str += records[i+1][1][j]+"\n";//観測地域最後の気温データで改行
      }else{
        str += records[i+1][1][j]+","; //カンマで区切る
      }
    }
  }


  
  let bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  var blob =new Blob([bom , str],{type:"text/csv"}); //配列に上記の文字列(str)を設定

  let downloadLink = document.createElement('a');
  downloadLink.download = 'keylogdata.csv';
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.dataset.downloadurl = ['text/plain', downloadLink.download, downloadLink.href].join(':');
  downloadLink.click();
  
}

const download = document.getElementById("download");
//ボタンがクリックされたら「createAndDownloadCsv」を実行する
download.addEventListener("click", createAndDownloadCsv, false);