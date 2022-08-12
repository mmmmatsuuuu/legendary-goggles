// 初期値
const INTERVIEW_ID = "interviews";
const COUNT_ID = "count";
const QUESTION_DOM = "question";

/** ==========================================================
 * 初期処理
 * ===========================================================
 */
window.addEventListener("load", function() {
    // 質問データの読み込み
    const data = loadFromLocalStorage(INTERVIEW_ID);

    // 最初の質問の表示
    const p = this.document.getElementById(QUESTION_DOM);
    p.innerHTML = data[0].question;
});

/** ==========================================================
 * イベントハンドラー
 * ===========================================================
 */

/** ==========================================================
 * 共通関数
 * ===========================================================
 */