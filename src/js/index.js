// 初期値
const interviewTemplate = {
    number: 0,
    question: "",
    modelAnswer: "",
}
const interviewsTemplate = [
    { number: 1, question: "志望動機を教えてください。", modelAnswer: "貴校の校風が私の目標とマッチすると思い志望しました。"},
    { number: 2, question: "長所を教えてください。", modelAnswer: "何事にも積極的に取り組めるところです。"},
    { number: 3, question: "短所を教えてください。", modelAnswer: "こだわりが強いところです。それを直すために..."},
];

let COUNT_INIT = 3;
const TABLE_ID = "q-table-body";
const INTERVIEW_ID = "interviews";
const COUNT_ID = "count";

/** ==========================================================
 * 初期処理
 * ===========================================================
 */
window.addEventListener("load", function() {
    // LocalStorageからデータを取得もしくは、LocalStorageの初期化
    let interviewData = loadFromLocalStorage(INTERVIEW_ID);
    if (!interviewData) {
        interviewData = interviewsTemplate;
        setToLocalStorage(INTERVIEW_ID, interviewData);
    }
    
    // カウントの更新
    const count = loadFromLocalStorage(COUNT_ID);
    if (!count) {
        setToLocalStorage(COUNT_ID, COUNT_INIT);
    }
    
    // テーブル要素を取得
    setDataToTable(TABLE_ID, interviewData);
});

/** ==========================================================
 * イベントハンドラー
 * ===========================================================
 */

/**
 * 新しい質問事項を追加
 */
function createData() {
    // 追加の質問内容の取得
    const count = loadFromLocalStorage(COUNT_ID) + 1;
    // 追加の質問内容をデータに反映
    const q = document.getElementById("input-question").value;
    const a = document.getElementById("input-model-answer").value;
    // 追加の質問内容をLocalStorageに反映
    const question = interviewTemplate;
    question.number = count;
    question.question = q;
    question.modelAnswer = a;
    console.log(question);
    // LocalStorageの内容をテーブルに反映
    const interviewData = loadFromLocalStorage(INTERVIEW_ID);
    interviewData.push(question);
    setToLocalStorage(INTERVIEW_ID, interviewData);
    setToLocalStorage(COUNT_ID, count);

    // テーブルに反映
    setDataToTable(TABLE_ID, interviewData);
}

/**
 * 既存の質問事項を編集
 * @param {Integer} num 
 */
function updateData(num) {
    console.log(num + "を編集します。");
}

/**
 * 既存の質問事項を削除
 * @param {Integer} num 
 */
function deleteData(num) {
    console.log(num + "を削除します。");
    // LocalStorageのデータを取得
    const interviewData = loadFromLocalStorage(INTERVIEW_ID);

    // 該当番号のデータを削除
    for (let i = 0; i < interviewData.length; i++) {
        if (interviewData[i].number == num) {
            interviewData.splice(i, 1);
        }
    }
    // データをLocalStorageに反映
    setToLocalStorage(INTERVIEW_ID, interviewData);
    // テーブルに反映
    setDataToTable(TABLE_ID, interviewData);
}

/**
 * ローカルストレージを空にする。
 */
function initAll() {
    clearLocalStorage();
    location.href = "./";
}

/** ==========================================================
 * 共通関数
 * ===========================================================
 */

/**
 * データからテーブルを生成
 * @param {stirng} tableId 
 * @param {any} datas 
 */
function setDataToTable(tableId, datas) {
    const table = this.document.getElementById(tableId);
    // テーブル初期化
    table.innerHTML = "";

    for (let i = 0; i < datas.length; i++) {
        // テーブル要素にデータを反映
        var data = datas[i];
        var tr = this.document.createElement("tr");
        // 番号フィールド
        var tdNumber = this.document.createElement("td");
        tdNumber.innerHTML = i + 1;
        tr.appendChild(tdNumber);
        // 質問内容フィールド
        var tdQuestion = this.document.createElement("td");
        tdQuestion.innerHTML = data.question;
        tr.appendChild(tdQuestion);
        // 模範解答フィールド
        var tdModelAnswer = this.document.createElement("td");
        tdModelAnswer.innerHTML = data.modelAnswer;
        tr.appendChild(tdModelAnswer);
        // 編集フィールド
        var tdEdit = this.document.createElement("td");
        var btnEdit = this.document.createElement("button");
        btnEdit.innerText = "編集";
        btnEdit.setAttribute("onclick", `updateData(${ data.number })`);
        tdEdit.appendChild(btnEdit);
        tr.appendChild(tdEdit);
        // 削除フィールド
        var tdDelete = this.document.createElement("td");
        var btnDelete = this.document.createElement("button");
        btnDelete.innerText = "削除";
        btnDelete.setAttribute("onclick", `deleteData(${ data.number })`)
        tdDelete.appendChild(btnDelete);
        tr.appendChild(tdDelete);
        
        table.appendChild(tr);
    }
}