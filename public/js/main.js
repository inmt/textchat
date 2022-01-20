  // Your web app's Firebase configuration
   // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  var firebaseConfig = {
      apiKey: "AIzaSyALY9xdjJAhoLRN7b9gbYdnkPfqQGweAUM",
      authDomain: "textchat-68193.firebaseapp.com",
      projectId: "textchat-68193",
      storageBucket: "textchat-68193.appspot.com",
      messagingSenderId: "452943293425",
      appId: "1:452943293425:web:4e443f47fb2ab33f903250",
      measurementId: "G-NBDV9PG2QC"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  //firebaseとデータ入れにmessagesと言う名前をつけて使えるようにする
  const db = firebase.firestore();
  const collection = db.collection('message11');  //←この値を変更することでコレクションを増やせます

  //authenticationを使えるようにする
  const auth = firebase.auth();

  //ユーザ情報を保存するための変数
  let me = null;

  //formとmessage要素の取得
  const message = document.getElementById('message');
  const form = document.querySelector('form');
  const messages = document.getElementById('messages');
  const username = document.getElementById('nameInput');

  //login状態の監視
  auth.onAuthStateChanged(user => {
    if(user){
      me = user;
      while(message.firstChild){
        messages.removeChild(messages.firstChild);
      }
      
      //チャット部分の表示
      collection.orderBy('timestamp').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added'){
            const li = document.createElement('li');
            const d = change.doc.data();

            //取得したデータの名前が自分なら右側に吹き出しを出す
            if( d.uid == (`${user.uid}`)){
              // if( d.username = (`${username.value}`)){
              var new_element1 = document.getElementById("messages");
              new_element1.insertAdjacentHTML("beforebegin", "<il><p class='sender_name me'>" + d.username + "</p><p class='right_balloon'>" + d.message + "</p><p class='clear_balloon'></p></il>");

            }else{    //取得したデータの名前が自分以外なら左側に吹き出しを出す
              var new_element2 = document.getElementById("messages");
              new_element2.insertAdjacentHTML("beforebegin", "<il><p class='sender_name'>" + d.username + "</p><p class='left_balloon'>" + d.message + "</p><p class='clear_balloon'></p></il>");
            }
            // チャットの一番下にスクロールする
            var scroll = document.getElementById("scroller");
            scroll.scrollTop = scroll.scrollHeight;
          }
        });
      }, error => {});

      //loginしている場合
      console.log(`ログインしている人がいます: ${user.uid}`);
      message.focus();
      return;
    }

    me = null;

    //loginしていない場合
    console.log(`誰もログインしていません`);
  });

  //長押し対策
  let isFirstPost = true;

  form.addEventListener('submit', e => {
    e.preventDefault();

    //メッセージが空だった時にそれ以降の処理をしない
    const val = message.value.trim();
    if(val === ""){
      return;
    }

    const val2 = username.value.trim();
    if(val2 === ""){
      return;
    }

    //フォームを空にしてフォーカスをあてる（処理成功の場合にあったものを移動）
    message.value = '';
    message.focus();

  //add()を使ってデータ入れにデータを保存してIDをふる
  collection.add({
    message: val,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    username: val2,
    uid: me ? me.uid: 'nobody'
  })

  //処理が成功した場合の処理、コンソールにidを表示
  //messageの中身は空にし、フォームにフォーカスをあてる
  .then(doc => {
    console.log(`${doc.id} added!`);
  })

  //処理が失敗した場合の処理、コンソールにエラーメッセージを表示
  .catch(error => {
    console.log('document add error!');
    console.log(error);
  });
});

//投稿されたらページ遷移しないように
  form.addEventListener('submit', e => {
    e.preventDefault();

    //メッセージが空だった時にそれ以降の処理をしない
    const val = message.value.trim();
    if(val === ""){
      return;
    }

    const val2 = username.value.trim();
    if(val2 === ""){
      return;
    }

    //フォームを空にしてフォーカスをあてる（処理成功の場合にあったものを移動）
    message.value = '';
    message.focus();

  //add()を使ってデータ入れにデータを保存してIDをふる
  collection.add({
    message: val,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    username: val2,
    uid: me ? me.uid: 'nobody'
  })

  //処理が成功した場合の処理、コンソールにidを表示
  //messageの中身は空にし、フォームにフォーカスをあてる
  .then(doc => {
    console.log(`${doc.id} added!`);
  })

  //処理が失敗した場合の処理、コンソールにエラーメッセージを表示
  .catch(error => {
    console.log('document add error!');
    console.log(error);
  });
});

//ページ読み込み時にフォーカスをあてる
message.focus();