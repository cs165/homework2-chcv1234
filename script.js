// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

const items = document.querySelectorAll('.flex-item')
var allItem = {} ;
var fanswer = {} ;
var fmax = null ;
var finish = [0,0,0] ;

const restart = document.querySelector('.reset')
restart.addEventListener('click',reset);

for(const item of items)
{
    item.addEventListener('click',beSelect);

    allItem[item.dataset.choiceId+item.dataset.questionId] = {
        type:item.dataset.choiceId+item.dataset.questionId,
        CID:item.dataset.choiceId,
        QID:item.dataset.questionId,
        selected:false
    }

    fanswer[item.dataset.choiceId] = {
        cnt:0
    }

}

function beSelect(event) {
    const container = event.currentTarget;

    for(let item of items)
    {
        let thisType=item.dataset.choiceId+item.dataset.questionId;

        if(allItem[thisType].QID===container.dataset.questionId)
        {
            if(allItem[thisType].selected === false)
            {
                item.classList.remove('flex-item-unselected');
            }
            else if(allItem[thisType].selected === true)
            {
                item.classList.remove('flex-item-selected');
                allItem[thisType].selected = false ;
                fanswer[item.dataset.choiceId].cnt-=1;
            }
        }


    }

    container.classList.add('flex-item-selected');
    allItem[container.dataset.choiceId+container.dataset.questionId].selected = true ;
    fanswer[container.dataset.choiceId].cnt += 1;

    if(fmax===null)
    {
        fmax=container.dataset.choiceId;
    }

    console.log("fanswer:"+container.dataset.choiceId+":"+fanswer[container.dataset.choiceId].cnt);

    if(allItem[container.dataset.choiceId+container.dataset.questionId].QID==="one")
    {
        finish[0]=1;

        if(fanswer[container.dataset.choiceId].cnt === fanswer[fmax].cnt)
        {
            fmax = container.dataset.choiceId ;
        }

        console.log("fmax:"+fmax);
    }
    if(allItem[container.dataset.choiceId+container.dataset.questionId].QID==="two")
    {
        finish[1]=1;

        console.log("fmax:"+fmax);
    }
    if(allItem[container.dataset.choiceId+container.dataset.questionId].QID==="three")
    {
        finish[2]=1;

        console.log("fmax:"+fmax);
    }

    if(fanswer[container.dataset.choiceId].cnt > fanswer[fmax].cnt)
    {
        fmax = container.dataset.choiceId ;
    }

    if(finish[0]===1 && finish[1]===1 && finish[2]===1){
        answer();
        console.log("ANSWER:"+fmax);
        //return;
    }

    beGray(event);
}

function beGray(event) {

    console.log("be gray");
    for(let item of items)
    {
        let thisType=item.dataset.choiceId+item.dataset.questionId;

        if(allItem[thisType].QID===event.currentTarget.dataset.questionId)
        {
            if(allItem[thisType].selected===false)
            {
                item.classList.add('flex-item-unselected');
            }
        }

    }
}


function answer(){

    document.getElementById("title").innerHTML="You got: "+RESULTS_MAP[fmax].title;
    document.getElementById("contents").innerHTML=RESULTS_MAP[fmax].contents;
    document.getElementById("reset").style.display="";

    for(let item of items)
    {
        item.removeEventListener('click',beSelect);
    }

}


function reset() {

    for(let item of items)
    {
        item.addEventListener('click',beSelect);

        allItem[item.dataset.choiceId+item.dataset.questionId] = {
            type:item.dataset.choiceId+item.dataset.questionId,
            CID:item.dataset.choiceId,
            QID:item.dataset.questionId,
            selected:false
        }

        item.classList.remove('flex-item-unselected');
        item.classList.remove('flex-item-selected');

        fanswer[item.dataset.choiceId] = {
            cnt:0
        }

        fmax = null;
        finish=[0,0,0];

        document.getElementById("title").innerHTML="";
        document.getElementById("contents").innerHTML="";
        document.getElementById("reset").style.display="none";
    }

    document.getElementById("bar").scrollIntoView({behavior: "smooth" , block: "start"});

}

