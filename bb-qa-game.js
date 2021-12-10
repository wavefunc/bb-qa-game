/* --------------------- 宣告變數 --------------------- */

// 將對話框 class 放到二維陣列變數 dialog [Before | Correct | Wrong]
// Before 是答案之前的對話框。Correct 是答對後的對話框；Wrong 則反之
var dialogBefore = [
    document.querySelectorAll('.dialog1Before'),
    document.querySelectorAll('.dialog2Before'),
    document.querySelectorAll('.dialog3Before'),
    document.querySelectorAll('.dialog4Before')
];
var dialogCorrect = [
    document.querySelectorAll('.dialog1Correct'),
    document.querySelectorAll('.dialog2Correct'),
    document.querySelectorAll('.dialog3Correct'),
    document.querySelectorAll('.dialog4Correct')
];
var dialogWrong = [
    document.querySelectorAll('.dialog1Wrong'),
    document.querySelectorAll('.dialog2Wrong'),
    document.querySelectorAll('.dialog3Wrong'),
    document.querySelectorAll('.dialog4Wrong')
];
// 答案選項的 div 放到陣列變數 optDivAry
var optDivAry = document.querySelectorAll('.optDiv');
// 答案選項的 button 放到二維陣列變數 optAry
var optAry = [
    document.querySelectorAll('.option1'),
    document.querySelectorAll('.option2'),
    document.querySelectorAll('.option3'),
    document.querySelectorAll('.option4')
];
// 動物關主的 div 放到陣列變數 animalAry
var animalAry = document.querySelectorAll('.animal');
// 放入最後一關的編號
var qaIndexFinal = 3;
// var qaIndexFinal = 0; //測試用

/* --------------------- 設定對話框"下一步"按鈕的功能 --------------------- */

// [點擊更換至下一個對話框] 的函式
// dialog1：原本對話框，dialog2：接下來的對話框
// diaStatus：判斷是選擇答案前 or 後的對話框，還是答錯的對話框
// qaIndex：關卡編號
function btnDialogClick(dialog1, dialog2, diaStatus, qaIndex) {
    dialog1.querySelector('.btn').addEventListener('click', function () {
        // 隱藏原本的對話框
        dialog1.style.display = 'none';

        if (dialog2 != null) {
            // 下一個對話框 dialog2 要不為 null，才會顯示並啟動接下來的對話框
            dialog2.style.display = 'block';
            dialog2.style.animationPlayState = 'running';

        }
        else if (diaStatus == 'Correct' && qaIndex == qaIndexFinal) {
            // 如果 dialog2 為 null，且是答案正確後 (Correct) 的對話框
            // 且到了最後一關 (qaIndex = 2)
            endRun(qaIndex);
        }
        else if (diaStatus == 'Before') {
            // 如果 dialog2 為 null，且是選擇答案前 (Before) 的對話框
            // 則進入選擇答案的QA
            optionQA(qaIndex);

        } else if (diaStatus == 'Correct') {
            // 如果 dialog2 為 null，且是答案正確後 (Correct) 的對話框
            // 則進入下一關卡
            startRun(qaIndex + 1);

        } else {
            // 如果 dialog2 為 null，且是答案錯誤後 (Wrong) 的對話框
            // 則降下黑幕，出現開始按鈕並改為'重新再來'
            document.getElementById('btnStart').style.display = 'block';
            document.getElementById('btnStart').innerText = '重新再來';
            document.getElementById('screen').style.display = 'block';

            // 透過移除並重設 animation 的方式，重設動物關主的動畫
            animalAry.forEach((item) => {
                item.style.animationName = 'none';
                void item.offsetWidth;
                item.style.animation = 'rollRightImage 3s linear 2s both paused';
            });
        }
    });
}

// 將每個對話框下的按鈕，都放入 [點擊更換至下一個對話框] 的函式
dialogBefore.forEach((item1d, index1d) => {
    item1d.forEach((item2d, index2d, arr) => {
        btnDialogClick(arr[index2d], arr[index2d + 1], 'Before', index1d);
    });
});
dialogCorrect.forEach((item1d, index1d) => {
    item1d.forEach((item2d, index2d, arr) => {
        btnDialogClick(arr[index2d], arr[index2d + 1], 'Correct', index1d);
    });
});
dialogWrong.forEach((item1d, index1d) => {
    item1d.forEach((item2d, index2d, arr) => {
        btnDialogClick(arr[index2d], arr[index2d + 1], 'Wrong', index1d);
    });
});


/* --------------------- 設定"答案選項"按鈕的功能 --------------------- */

// 將每個"答案選項"按鈕，都放入 [點擊後判斷正確還是錯誤，顯示相應的對話框] 的函式
optAry.forEach((item1d, index1d) => {
    item1d.forEach((item2d, index2d, arr) => {
        item2d.addEventListener('click', function () {
            // 隱藏答案選項
            optDivAry[index1d].style.display = 'none';

            if (item2d.value == 'correct') {
                dialogCorrect[index1d][0].style.display = 'block';
                dialogCorrect[index1d][0].style.animationPlayState = 'running';
            }
            else {
                dialogWrong[index1d][0].style.display = 'block';
                dialogWrong[index1d][0].style.animationPlayState = 'running';
            }
        });
    });
});


/* --------------------- 控制流程函式 --------------------- */

// [一開始 | 在 dialogCorrect 結束後]，讓大家開始跑動
function startRun(qaIndex) { // qaIndex：要進入的關卡 index
    // 讓bb 移回左邊並重設動畫
    document.getElementById('bbIcon').style.animationName = 'none';
    void document.getElementById('bbIcon').offsetWidth;
    document.getElementById('bbIcon').style.animation = 'moveCenter 3s linear 1 both paused';
    document.getElementById('bbIconImg').style.animation = 'swapImage 0.4s step-start infinite paused';

    // 移除煙火
    document.getElementById('bbQaGame').classList.remove("fireworks");

    if (qaIndex == 0) { // 如果是第一關主，隱藏"開始按鈕"及"遮幕"
        document.getElementById('btnStart').style.display = 'none';
        document.getElementById('screen').style.display = 'none';
    }
    else {  // 若是其他關主，則讓前一隻關主往左移動出去div
        animalAry[qaIndex - 1].style.animation = 'rollLeftImage linear 8.5s both paused';
        animalAry[qaIndex - 1].style.animationPlayState = 'running';
    }

    // 讓bb、背景、關主開始跑動
    document.getElementById('bgImg').style.animationPlayState = 'running';
    document.getElementById('bbIconImg').style.animationPlayState = 'running';
    animalAry[qaIndex].style.animationPlayState = 'running';

    // 開始?秒後，進入下一關
    setTimeout(() => {
        enterQA(qaIndex)
    }, 5000);
}

// 進入關卡 
function enterQA(qaIndex) {
    // 暫停bb、背景、烏龜
    document.getElementById('bgImg').style.animationPlayState = 'paused';
    document.getElementById('bbIconImg').style.animationPlayState = 'paused';
    animalAry[qaIndex].style.animationPlayState = 'paused';

    // 啟動 dialogBefore 對話框
    dialogBefore[qaIndex][0].style.display = 'block';
    dialogBefore[qaIndex][0].style.animationPlayState = 'running';
}

function optionQA(qaIndex) {   // 顯示關卡的答案選項
    optDivAry[qaIndex].style.display = 'flex';
    optDivAry[qaIndex].style.animationPlayState = 'running';
}

function endRun(qaIndex) {
    // 讓該關關主往左移動出去div
    animalAry[qaIndex].style.animation = 'rollLeftImage linear 4s both paused';
    animalAry[qaIndex].style.animationPlayState = 'running';

    // 讓bb、背景開始跑動
    document.getElementById('bgImg').style.animationPlayState = 'running';
    document.getElementById('bbIconImg').style.animationPlayState = 'running';

    // 讓bb 往中間移動
    document.getElementById('bbIcon').style.animationPlayState = 'running';

    // 跑?秒後，停止跑動，顯示結束對話框
    setTimeout(() => {
        document.getElementById('bgImg').style.animationPlayState = 'paused';
        document.getElementById('bbIconImg').style.animationPlayState = 'paused';
        document.querySelector('.dialogFinal').style.display = 'block';
        document.querySelector('.dialogFinal').style.animationPlayState = 'running';
    }, 5000);
}

// 按下"跳舞"按鈕，bb開始跳舞
$('.btnDialogFinal').click(function () {
    document.querySelector('.dialogFinal').style.display = 'none';
    document.getElementById('bbIconImg').style.animation = 'bbDance 1s step-start infinite running';

    // 出現開始按鈕並改為'再玩一次'
    document.getElementById('btnStart').style.display = 'block';
    document.getElementById('btnStart').innerText = '再玩一次';

    // 透過移除並重設 class 的方式，重設動物關主的動畫
    animalAry.forEach((item) => {
        item.style.animationName = 'none';
        void item.offsetWidth;
        item.style.animation = 'rollRightImage 3s linear 2s both paused';
    });

    // 開始播放煙火
    document.getElementById('bbQaGame').classList.add("fireworks");
});

/* --------------------- 其他函式 --------------------- */

// 滑鼠移到 bb，bb 會開始跳舞
$('#bbIconImg').bind('mouseover', function () {
    document.getElementById('bbIconImg').style.animation = 'bbDance 1s step-start infinite running';
});
$('#bbIconImg').bind('mouseout', function () {
    document.getElementById('bbIconImg').style.animation = 'swapImage 0.4s step-start infinite paused';
});
