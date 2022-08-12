// 初期値
const INTERVIEW_ID = "interviews";
const ANSWER_ID = "answer";
const COUNT_ID = "count";
const QUESTION_DOM = "question";

const answerTemplate = {
    qNumber: 0,
    yourAnswer: "",
}

// テキスト読み上げAPI
const synth = new SpeechSynthesisUtterance(); 
synth.text   = "";
synth.lang   = "ja-JP";
synth.rate   = 1;
synth.pitch  = 1;
synth.volume = 1;

// 音声認識API
const recognition = new webkitSpeechRecognition();
recognition.lang = "ja-JP";
recognition.onresult = function(e) {
    recognition.stop();
    if(e.results[0].isFinal){
        const autotext =  e.results[0][0].transcript
        document.getElementById("answer").value = autotext;
    }
}

/** ==========================================================
 * 初期処理
 * ===========================================================
 */
window.addEventListener("load", function() {
    // クエリパラメータの設定
    const url = new URL(location.href);
    const qID = Number(url.searchParams.get("q_id"));
    // 質問データの読み込み
    const data = loadFromLocalStorage(INTERVIEW_ID);

    // 最初の質問の表示
    const p = this.document.getElementById(QUESTION_DOM);
    p.innerHTML = data[qID].question;

    // ボタンの生成
    const prevBtn = this.document.getElementById("prev");
    const nextBtn = this.document.getElementById("next");

    if (qID == 0) {
        // 最初の質問の場合
        prevBtn.setAttribute("onclick", `myAlert("これは最初の質問です。")`);
        nextBtn.setAttribute("onclick", `goNextQuestion(${ qID })`);
    } else if (qID == data.length - 1) {
        // 最後の質問の場合
        prevBtn.setAttribute("onclick", `goPreviousQuestion(${ qID })`);
        nextBtn.setAttribute("onclick", `goResultPage()`);
    } else {
        // 途中の質問の場合
        prevBtn.setAttribute("onclick", `goPreviousQuestion(${ qID })`);
        nextBtn.setAttribute("onclick", `goNextQuestion(${ qID })`);
    }
    const speakBtn = this.document.getElementById("speak");
    speakBtn.setAttribute("onclick", `playQuestion("${ data[qID].question }")`);
});

/** ==========================================================
 * イベントハンドラー
 * ===========================================================
 */

/**
 * 次の質問にページ遷移する
 * @param {Integer} num 
 */
function goNextQuestion(num) {
    // ユーザの解答登録
    storeAnswer();
    // ページ遷移
    location.href = `./interview.html?q_id=${ num + 1 }`;
}

/**
 * 前の質問にページ遷移する
 * @param {Integer} num 
 */
function goPreviousQuestion(num) {
    location.href = `./interview.html?q_id=${ num - 1 }`;
}

/**
 * 結果のページに遷移する
 */
function goResultPage() {
    // ユーザの解答登録
    storeAnswer();
    location.href = "./result.html";
}

/**
 * 質問文を再生する
 * @param {string} question 
 */
function playQuestion(question) {
    synth.text = question;
    speechSynthesis.speak(synth);
}

/**
 * ユーザーの解答を文字に起こす
 */
function recAnswer() {
    recognition.start();
}

/**
 * 文字に起こしたユーザーの解答をlocalstorageに保存する
 */
function storeAnswer() {
    const userAns = document.getElementById("answer").value;
    if (userAns) {
        const answers = loadFromLocalStorage(ANSWER_ID);
        const data = loadFromLocalStorage(INTERVIEW_ID);
        const url = new URL(location.href);
        const qID = Number(url.searchParams.get("q_id"));
        const answer = answerTemplate;
        answer.qNumber = data[qID].number;
        answer.yourAnswer = userAns;
        if (answers) {
            answers.push(answer);
            setToLocalStorage(ANSWER_ID, answers);
        } else {
            setToLocalStorage(ANSWER_ID, [answer]);
        }
    }
}

/**
 * アラートを出す
 * @param {string} str 
 */
function myAlert(str) {
    alert(str);
}

/** ==========================================================
 * 共通関数
 * ===========================================================
 */
