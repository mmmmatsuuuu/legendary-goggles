// 初期値
let COUNT_INIT     = 3;
const TABLE_ID     = "result-list";
const INTERVIEW_ID = "interviews";
const ANSWER_ID    = "answer";
const COUNT_ID     = "count";

/** ==========================================================
 * 初期処理
 * ===========================================================
 */
window.addEventListener("load", function() {
    const url = new URL(location.href);
    const interviewID = Number(url.searchParams.get("interview_id"));

    // LocalStorageからデータを取得もしくは、LocalStorageの初期化
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
    
    if (!currentInterview) this.location.href = "./index.html";

    // テーブル要素を取得
    setDataToTable(TABLE_ID, currentInterview.contents);
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
 * データから一覧を生成
 * @param {stirng} tableId 
 * @param {any} datas 
 */
function setDataToTable(tableId, datas) {
    const div = this.document.getElementById(tableId);
    // テーブル初期化
    div.innerHTML = "";



    for (let i = 0; i < datas.length; i++) {
        // テーブル要素にデータを反映
        var data = datas[i];
        var innerDiv = this.document.createElement("div");
        innerDiv.classNam = "mb-2";
        innerDiv.innerHTML = 
`
<h2 class="text-main text-xl font-black border-b border-secondary mb-1">No.${ i + 1 }</h2>
<div class="flex mb-1 items-top">
    <div class="basis-1/6 bg-main text-white text-center p-1">質問内容</div>
    <div class="basis-5/6 p-1">${ data.question }</div>
</div>
<div class="flex mb-1 items-top">
    <div class="basis-1/6 bg-main text-white text-center p-1">あなたの解答</div>
    <div class="basis-5/6 p-1">${ data.userAnswer }</div>
</div>
<div class="flex mb-1 items-top">
    <div class="basis-1/6 bg-main text-white text-center p-1">模範解答</div>
    <div class="basis-5/6 p-1">${ data.modelAnswer }</div>
</div>
`;
        div.appendChild(innerDiv);
    }
}