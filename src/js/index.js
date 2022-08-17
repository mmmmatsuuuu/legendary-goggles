// 初期値
const interviewTemplate = {
    number: 0,
    question: "",
    modelAnswer: "",
    userAnswer: "",
}
const interviewsTemplate = {
    interview1: {
        count: 3,
        contents: [
            { number: 1, question: "志望動機を教えてください。", modelAnswer: "貴校の校風が私の目標とマッチすると思い志望しました。", userAnswer: ""},
            { number: 2, question: "長所を教えてください。", modelAnswer: "何事にも積極的に取り組めるところです。", userAnswer: ""},
            { number: 3, question: "短所を教えてください。", modelAnswer: "こだわりが強いところです。それを直すために...", userAnswer: ""},
        ],
    },
    interview2: {
        count: 3,
        contents: [
            { number: 1, question: "志望動機を教えてください。", modelAnswer: "貴校の校風が私の目標とマッチすると思い志望しました。", userAnswer: ""},
            { number: 2, question: "長所を教えてください。", modelAnswer: "何事にも積極的に取り組めるところです。", userAnswer: ""},
            { number: 3, question: "短所を教えてください。", modelAnswer: "こだわりが強いところです。それを直すために...", userAnswer: ""},
        ],
    },
    interview3: {
        count: 3,
        contents: [
            { number: 1, question: "志望動機を教えてください。", modelAnswer: "貴校の校風が私の目標とマッチすると思い志望しました。", userAnswer: ""},
            { number: 2, question: "長所を教えてください。", modelAnswer: "何事にも積極的に取り組めるところです。", userAnswer: ""},
            { number: 3, question: "短所を教えてください。", modelAnswer: "こだわりが強いところです。それを直すために...", userAnswer: ""},
        ],
    },
    interview4: {
        count: 3,
        contents: [
            { number: 1, question: "志望動機を教えてください。", modelAnswer: "貴校の校風が私の目標とマッチすると思い志望しました。", userAnswer: ""},
            { number: 2, question: "長所を教えてください。", modelAnswer: "何事にも積極的に取り組めるところです。", userAnswer: ""},
            { number: 3, question: "短所を教えてください。", modelAnswer: "こだわりが強いところです。それを直すために...", userAnswer: ""},
        ],
    },
}

const COUNT_INIT   = interviewTemplate.length;
const TABLE_ID     = "q-table-body";
const INTERVIEW_ID = "interviews";
const ANSWER_ID    = "answer";

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

    // テーブル要素を取得
    setDataToTable(`${TABLE_ID}-1`, interviewData.interview1.contents, 1);
    setDataToTable(`${TABLE_ID}-2`, interviewData.interview2.contents, 2);
    setDataToTable(`${TABLE_ID}-3`, interviewData.interview3.contents, 3);
    setDataToTable(`${TABLE_ID}-4`, interviewData.interview4.contents, 4);
});

/** ==========================================================
 * イベントハンドラー
 * ===========================================================
 */

/**
 * 新しい質問事項を追加
 * @param {Integer} interviewNum 
 */
function createData(interviewNum) {
    // 追加の質問内容の取得
    const interviewData = loadFromLocalStorage(INTERVIEW_ID);
    let count;
    // 追加の質問内容をデータに反映
    const q = document.getElementById("input-question-" + interviewNum).value;
    const a = document.getElementById("input-model-answer-" + interviewNum).value;
    // 追加の質問内容をLocalStorageに反映
    const question = interviewTemplate;
    question.question = q;
    question.modelAnswer = a;
    switch (interviewNum) {
        case 1:
            count = interviewData.interview1.count + 1;
            question.number = count;
            interviewData.interview1.contents.push(question);
            interviewData.interview1.count = count;
            break;
        case 2:
            count = interviewData.interview2.count + 1;
            question.number = count;
            interviewData.interview2.contents.push(question);
            interviewData.interview2.count = count;
            break;
        case 3:
            count = interviewData.interview3.count + 1;
            question.number = count;
            interviewData.interview3.contents.push(question);
            interviewData.interview3.count = count;
            break;
        case 4:
            count = interviewData.interview4.count + 1;
            question.number = count;
            interviewData.interview4.contents.push(question);
            interviewData.interview4.count = count;
            break;
        default:
            alert("不適切な値を取得しました。");
            return;
    }
    // LocalStorageの内容をテーブルに反映
    setToLocalStorage(INTERVIEW_ID, interviewData);

    // テーブルに反映
    setDataToTable(`${TABLE_ID}-1`, interviewData.interview1.contents, 1);
    setDataToTable(`${TABLE_ID}-2`, interviewData.interview2.contents, 2);
    setDataToTable(`${TABLE_ID}-3`, interviewData.interview3.contents, 3);
    setDataToTable(`${TABLE_ID}-4`, interviewData.interview4.contents, 4);

    document.getElementById("input-question-" + interviewNum).value = "";
    document.getElementById("input-model-answer-" + interviewNum).value = "";
}

/**
 * 編集画面用モーダルを開く
 * @param {*} interviewNum 
 * @param {*} qNum 
 * @returns 
 */
function openUpdateWindow(interviewNum, qNum) {
    const interviewData = loadFromLocalStorage(INTERVIEW_ID);

    let currentContents
    switch (interviewNum) {
        case 1:
            currentContents = interviewData.interview1.contents;
            break;
        case 2:
            currentContents = interviewData.interview2.contents;
            break;
        case 3:
            currentContents = interviewData.interview3.contents;
            break;
        case 4:
            currentContents = interviewData.interview4.contents;
            break;
        default:
            alert("不適切な値を取得しました。");
            return;
    }

    for (let i = 0; i < currentContents.length; i++) {
        if (currentContents[i].number == qNum) {
            document.getElementById("edit-question").value = currentContents[i].question;
            document.getElementById("edit-answer").value = currentContents[i].modelAnswer;
        }
    }
    document.getElementById("edit-button").setAttribute("onclick", `updateData(${ interviewNum }, ${ qNum }, "${ TABLE_ID + "-" + interviewNum }")`);
    document.getElementById("modal").classList.remove("hidden");
}

/**
 * 編集画面用モーダルを閉じる。
 */
function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

/**
 * 既存の質問事項を編集
 * @param {Integer} interviewNum 
 * @param {Integer} qNum 
 */
function updateData(interviewNum, qNum, tableId) {
    const interviewData = loadFromLocalStorage(INTERVIEW_ID);

    const q = document.getElementById("edit-question").value;
    const a = document.getElementById("edit-answer").value;

    switch (interviewNum) {
        case 1:
            for (let i = 0; i < interviewData.interview1.contents.length; i++) {
                if (interviewData.interview1.contents[i].number == qNum) {
                    interviewData.interview1.contents[i].question = q;
                    interviewData.interview1.contents[i].modelAnswer = a;
                }
            }
            setDataToTable(tableId, interviewData.interview1.contents, 1);
            break;
        case 2:
            for (let i = 0; i < interviewData.interview2.contents.length; i++) {
                if (interviewData.interview2.contents[i].number == qNum) {
                    interviewData.interview2.contents[i].question = q;
                    interviewData.interview2.contents[i].modelAnswer = a;
                }
            }
            setDataToTable(tableId, interviewData.interview2.contents, 2);
            break;
        case 3:
            for (let i = 0; i < interviewData.interview3.contents.length; i++) {
                if (interviewData.interview3.contents[i].number == qNum) {
                    interviewData.interview3.contents[i].question = q;
                    interviewData.interview3.contents[i].modelAnswer = a;
                }
            }
            setDataToTable(tableId, interviewData.interview3.contents, 3);
            break;
        case 4:
            for (let i = 0; i < interviewData.interview4.contents.length; i++) {
                if (interviewData.interview4.contents[i].number == qNum) {
                    interviewData.interview4.contents[i].question = q;
                    interviewData.interview4.contents[i].modelAnswer = a;
                }
            }
            setDataToTable(tableId, interviewData.interview4.contents, 4);
            break;
        default:
            alert("不適切な値を取得しました。");
            return;
    }
    setToLocalStorage(INTERVIEW_ID, interviewData);
    document.getElementById("modal").classList.add("hidden");
}

/**
 * 既存の質問事項を削除
 * @param {Integer} interviewNum 
 * @param {Integer} qNum 
 */
function deleteData(interviewNum, qNum) {
    // LocalStorageのデータを取得
    const interviewData = loadFromLocalStorage(INTERVIEW_ID);

    switch(interviewNum) {
        case 1:
            // 該当番号のデータを削除
            for (let i = 0; i < interviewData.interview1.contents.length; i++) {
                if (interviewData.interview1.contents[i].number == qNum) {
                    interviewData.interview1.contents.splice(i, 1);
                }
            }
            break;
        case 2:
            // 該当番号のデータを削除
            for (let i = 0; i < interviewData.interview2.contents.length; i++) {
                if (interviewData.interview2.contents[i].number == qNum) {
                    interviewData.interview2.contents.splice(i, 1);
                }
            }
            break;
        case 3:
            // 該当番号のデータを削除
            for (let i = 0; i < interviewData.interview3.contents.length; i++) {
                if (interviewData.interview3.contents[i].number == qNum) {
                    interviewData.interview3.contents.splice(i, 1);
                }
            }
            break;
        case 4:
            // 該当番号のデータを削除
            for (let i = 0; i < interviewData.interview4.contents.length; i++) {
                if (interviewData.interview4.contents[i].number == qNum) {
                    interviewData.interview4.contents.splice(i, 1);
                }
            }
            break;
    }

    // データをLocalStorageに反映
    setToLocalStorage(INTERVIEW_ID, interviewData);
    // テーブルに反映
    setDataToTable(`${TABLE_ID}-1`, interviewData.interview1.contents, 1);
    setDataToTable(`${TABLE_ID}-2`, interviewData.interview2.contents, 2);
    setDataToTable(`${TABLE_ID}-3`, interviewData.interview3.contents, 3);
    setDataToTable(`${TABLE_ID}-4`, interviewData.interview4.contents, 4);
}

/**
 * ローカルストレージを空にする。
 */
function initAll() {
    clearLocalStorage();
    location.href = "./";
}

/**
 * 押されたボタンに応じてタブを閉じる
 * @param {number} num 
 */
function changeTabs(num) {
    const tabs = document.getElementsByName("tabs");
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].id == `interview-${ num }`) {
            tabs[i].classList.remove("z-0");
            tabs[i].classList.remove("shadow-md");
            tabs[i].classList.add("z-10");
            tabs[i].classList.add("shadow-md");
        } else {
            tabs[i].classList.remove("z-10");
            tabs[i].classList.remove("shadow-md");
            tabs[i].classList.add("z-0");
            tabs[i].classList.add("shadow-md");
        }
    }
    const btns = document.getElementsByName("tab-btns");
    for (let i = 0; i < btns.length; i++) {
        if (btns[i].id == `tabs-${num}`) {
            btns[i].className = "px-8 py-2 bg-main text-white border-main border-2 border-b-0 shadow-md";
        } else {
            btns[i].className = "px-8 py-2 bg-white text-main border-main border-2 border-b-0";
        }
    }
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
function setDataToTable(tableId, datas, interviewNum) {
    const table = this.document.getElementById(tableId);
    // テーブル初期化
    table.innerHTML = "";

    for (let i = 0; i < datas.length; i++) {
        // テーブル要素にデータを反映
        var data = datas[i];
        var tr = this.document.createElement("tr");
        // 番号フィールド
        var tdNumber = this.document.createElement("td");
        tdNumber.className = "text-center border border-main p-1 w-1/12";
        tdNumber.innerHTML = i + 1;
        tr.appendChild(tdNumber);
        // 質問内容フィールド
        var tdQuestion = this.document.createElement("td");
        tdQuestion.className = "border border-main p-1 w-1/12";
        tdQuestion.innerHTML = data.question;
        tr.appendChild(tdQuestion);
        // 模範解答フィールド
        var tdModelAnswer = this.document.createElement("td");
        tdModelAnswer.className = "border border-main p-1 w-1/12";
        tdModelAnswer.innerHTML = data.modelAnswer;
        tr.appendChild(tdModelAnswer);
        // 編集フィールド
        var tdEdit = this.document.createElement("td");
        tdEdit.className = "text-center border border-main p-1 w-1/12";
        var btnEdit = this.document.createElement("button");
        btnEdit.className = "p-1 border-accent border-2 hover:bg-accent hover:text-white";
        btnEdit.innerText = "編集";
        btnEdit.setAttribute("onclick", `openUpdateWindow(${ interviewNum }, ${ data.number })`);
        tdEdit.appendChild(btnEdit);
        tr.appendChild(tdEdit);
        // 削除フィールド
        var tdDelete = this.document.createElement("td");
        tdDelete.className = "text-center border border-main p-1 w-1/12";
        var btnDelete = this.document.createElement("button");
        btnDelete.className = "p-1 border-accent border-2 hover:bg-accent hover:text-white";
        btnDelete.innerText = "削除";
        btnDelete.setAttribute("onclick", `deleteData(${ interviewNum }, ${ data.number })`)
        tdDelete.appendChild(btnDelete);
        tr.appendChild(tdDelete);
        
        table.appendChild(tr);
    }
}