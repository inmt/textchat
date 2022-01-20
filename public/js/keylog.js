
var records = [];

function inputCheck() {
  var inputValue = document.getElementById( "message" ).value;
  console.log(inputValue);
}

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

     console.log(`${yy} 年 ${mm} 月 ${dd} 日 ${h} : ${m} : ${s} : ${ms}`);
     console.log(`keydown:Ctrl + ${keyName}`);
     //ダウンロード用に、取得した情報を配列に格納
     var add1 = [`${yy} 年 ${mm} 月 ${dd} 日 `,`${h} : ${m} : ${s} : ${ms}`, `Ctrl + ${keyName}`];//配列
     records.push(add1);

   } else if (event.shiftKey) {

     console.log(`${yy} 年 ${mm} 月 ${dd} 日 ${h} : ${m} : ${s} : ${ms}`);
    console.log(`keydown:Shift + ${keyName}`);
    //ダウンロード用に、取得した情報を配列に格納
    var add2 = [`${yy} 年 ${mm} 月 ${dd} 日 `,`${h} : ${m} : ${s} : ${ms}`, `Shift + ${keyName}`];
    records.push(add2);

   } else {

     console.log(`${yy} 年 ${mm} 月 ${dd} 日 ${h} : ${m} : ${s} : ${ms}`);
     console.log(`keydown:${keyName}`);
     //ダウンロード用に、取得した情報を配列に格納
     var add3 = [`${yy} 年 ${mm} 月 ${dd} 日 `,`${h} : ${m} : ${s} : ${ms}`, `${keyName}`];
     records.push(add3);

   }

 });


 function createAndDownloadCsv() {
  
  //配列をcsvファイルに
  let bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  let data = records.map((record) => record.join('\t')).join('\r\n');
  var blob = new Blob([bom , data],{type:"text/csv"}); //配列に上記の文字列(str)を設定

  //ダウンロード処理
  let downloadLink = document.createElement('a');
  downloadLink.download = 'keylogdata.csv'; //ダウンロード時の名前
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.dataset.downloadurl = ['text/plain', downloadLink.download, downloadLink.href].join(':');
  downloadLink.click();
  
}

const download = document.getElementById("download");
//ボタンがクリックされたら「createAndDownloadCsv」を実行する
download.addEventListener("click", createAndDownloadCsv, false);