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
  const auth = firebase.auth();
   //ユーザ情報を保存するための変数
   let me = null;
 

//新規登録処理
register.addEventListener('click', function(e) {
  var mailAddress = document.getElementById('mailAddress').value;
  var password = document.getElementById('password').value;
  
  firebase.auth().createUserWithEmailAndPassword(mailAddress, password)
  .catch(function(error) {
    alert('登録できません（' + error.message + '）');
  });
});

//ログイン処理
login.addEventListener('click', function(e) {
  var mailAddress = document.getElementById('mailAddress').value;
  var password = document.getElementById('password').value;
  
  auth.signInWithEmailAndPassword(mailAddress, password)
  .catch(function(error) {
    alert('ログインできません（' + error.message + '）');
  });
});

//認証状態の確認
  auth.onAuthStateChanged(function(user) {
    if(user) {
      alert("ログインに成功しました");
      

    }else{
      //ログアウト状態
      alert('ログアウトしています（' + error.message + '）');
    }
});

