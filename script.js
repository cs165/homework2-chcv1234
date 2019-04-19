// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

const items = document.querySelectorAll('.flex-item')
var allItem = {} ;

for(const item of items)
{
    item.addEventListener('click',beSelect);

    allItem[item.dataset.choiceId+item.dataset.questionId] = {
        type:item.dataset.choiceId+item.dataset.questionId,
        CID:item.dataset.choiceId,
        QID:item.dataset.questionId,
        selected:false
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
            }
        }


    }

    container.classList.add('flex-item-selected');
    allItem[container.dataset.choiceId+container.dataset.questionId].selected = true ;
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