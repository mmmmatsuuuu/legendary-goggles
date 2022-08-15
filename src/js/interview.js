// 初期値
const INTERVIEW_ID   = "interviews";
const ANSWER_ID      = "answer";
const COUNT_ID       = "count";
const QUESTION_DOM   = "question";
const Q_NUM_DOM      = "question-number";
const INTERVIEW_INFO = "interview-info";

// テキスト読み上げAPI
const synth = new SpeechSynthesisUtterance(); 
synth.text   = "";
synth.lang   = "ja-JP";
synth.rate   = 1;
synth.pitch  = 0;
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
    const interviewID = Number(url.searchParams.get("interview_id"));

    // 質問データの読み込み
    const data = loadFromLocalStorage(INTERVIEW_ID);
    let currentInterview
    switch (interviewID) {
        case 1:
            currentInterview = data.interview1;
            break;
        case 2:
            currentInterview = data.interview2;
            break;
        case 3:
            currentInterview = data.interview3;
            break;
        case 4:
            currentInterview = data.interview4;
            break;
        default:
            alert("不適切な値を取得しました。");
            return;
    }
    
    // 最初の質問の表示
    const qNum  = this.document.getElementById(Q_NUM_DOM);
    const p     = this.document.getElementById(QUESTION_DOM);
    const inter = this.document.getElementById(INTERVIEW_INFO);
    qNum.value      = currentInterview.contents[qID].number;
    p.innerHTML     = currentInterview.contents[qID].question;
    inter.innerHTML = `${ qID + 1 } / ${ currentInterview.contents.length }`;

    // ボタンの生成
    const prevBtn = this.document.getElementById("prev");
    const nextBtn = this.document.getElementById("next");

    if (currentInterview.contents.length == 1) {
        // 最後の質問の場合
        prevBtn.setAttribute("onclick", `goPreviousQuestion(${ qID })`);
        nextBtn.innerHTML = "結果へ";
        nextBtn.setAttribute("onclick", `goResultPage()`);
    } else {
        if (qID == 0) {
            // 最初の質問の場合
            prevBtn.setAttribute("onclick", `myAlert("これは最初の質問です。")`);
            nextBtn.setAttribute("onclick", `goNextQuestion(${ qID })`);
        } else if (qID == currentInterview.contents.length - 1) {
            // 最後の質問の場合
            prevBtn.setAttribute("onclick", `goPreviousQuestion(${ qID })`);
            nextBtn.innerHTML = "結果へ";
            nextBtn.setAttribute("onclick", `goResultPage()`);
        } else {
            // 途中の質問の場合
            prevBtn.setAttribute("onclick", `goPreviousQuestion(${ qID })`);
            nextBtn.setAttribute("onclick", `goNextQuestion(${ qID })`);
        }
    }

    const speakBtn = this.document.getElementById("speak");
    speakBtn.setAttribute("onclick", `playQuestion("${ currentInterview.contents[qID].question }")`);
    playQuestion(currentInterview.contents[qID].question);
});

/** ==========================================================
 * イベントハンドラー
 * ===========================================================
 */

/**
 * 次の質問にページ遷移する
 * @param {Integer} qId 
 */
function goNextQuestion(qId) {
    // ユーザの解答登録
    storeAnswer();
    // ページ遷移
    const url = new URL(location.href);
    const interviewID = Number(url.searchParams.get("interview_id"));

    location.href = `./interview.html?interview_id=${ interviewID }&q_id=${ qId + 1 }`;
}

/**
 * 前の質問にページ遷移する
 * @param {Integer} qId 
 */
function goPreviousQuestion(qId) {
    // ページ遷移
    const url = new URL(location.href);
    const interviewID = Number(url.searchParams.get("interview_id"));

    location.href = `./interview.html?interview_id=${ interviewID }&q_id=${ qId - 1 }`;
}

/**
 * 結果のページに遷移する
 */
function goResultPage() {
    // ユーザの解答登録
    storeAnswer();
    // ページ遷移
    const url = new URL(location.href);
    const interviewID = Number(url.searchParams.get("interview_id"));

    location.href = `./result.html?interview_id=${ interviewID }`;
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
    const url = new URL(location.href);
    const interviewID = Number(url.searchParams.get("interview_id"));

    // 入力データの取得
    const qNum = document.getElementById(Q_NUM_DOM).value;
    const inputData = document.getElementById(ANSWER_ID).value;

    // データ整形
    const interviewData = loadFromLocalStorage(INTERVIEW_ID);
    let re;
    switch (interviewID) {
        case 1:
            re = setValueInContents(interviewData.interview1.contents, qNum, inputData, "userAnswer");
            break;
        case 2:
            re = setValueInContents(interviewData.interview2.contents, qNum, inputData, "userAnswer");
            break;
        case 3:
            re = setValueInContents(interviewData.interview3.contents, qNum, inputData, "userAnswer");
            break;
        case 4:
            re = setValueInContents(interviewData.interview4.contents, qNum, inputData, "userAnswer");
            break;
    }
    // データをLocalStorageに保存
    setToLocalStorage(INTERVIEW_ID, interviewData);
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
function setValueInContents(contents, number, value, key) {
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].number == number) {
            contents[i][key] = value;
            return "can change :) ";
        }
    }
    return "can't change. :( ";
}