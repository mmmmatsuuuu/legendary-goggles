// 初期値
let COUNT_INIT     = 3;
const TABLE_ID     = "r-table-body";
const INTERVIEW_ID = "interviews";
const ANSWER_ID    = "answer";
const COUNT_ID     = "count";

/** ==========================================================
 * 初期処理
 * ===========================================================
 */
window.addEventListener("load", function() {
    // LocalStorageからデータを取得もしくは、LocalStorageの初期化
    let interviewData = loadFromLocalStorage(INTERVIEW_ID);
    
    if (!interviewData) this.location.href = "./index.html";

    // テーブル要素を取得
    setDataToTable(TABLE_ID, interviewData);
});

/** ==========================================================
 * イベントハンドラー
 * ===========================================================
 */

/**
 * localstorage内のanswerデータを消去したからトップページに戻る
 */
function goTop() {
    removeLocalStorage(ANSWER_ID);
    location.href = "./index.html";
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

        const answers = loadFromLocalStorage(ANSWER_ID);
        console.log(answers);
        console.log(data);
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].qNumber == data.number) {
                tdEdit.innerHTML = answers[i].yourAnswer;
                break;
            } else {
                tdEdit.innerHTML = "録音されていません。";
            }
        }
        tr.appendChild(tdEdit);
        
        table.appendChild(tr);
    }
}