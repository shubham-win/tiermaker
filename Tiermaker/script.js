let currentDraggedItem;

const tierInput = document.getElementById('tier');
console.log(tierInput);

const itemContainers = document.getElementsByClassName('item-container');

// const tierLists = document.querySelectorAll('.tier-list');

const imageForm = document.getElementById('image-form');

const submitBtn = document.getElementById('submit');

for(const itemContainer of itemContainers){
    setUpItemCintainerForDrag(itemContainer);
}

// tierLists.forEach(setUpDropZoneInTierList);

imageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("Form submitted");

    const formData = new FormData(imageForm);
    console.log(formData);

    const imageItemInput = document.getElementById('image-item');
    if(imageItemInput.value == ''){
        alert('Please enter a valid url...');
        return;
    }
    const imageUrl = imageItemInput.value;
    console.log(imageUrl);
    createTierListItem(imageUrl);
    imageItemInput.value = '';
});


submitBtn.addEventListener('click', (event) => {
    console.log("Button is clicked")
    console.log("event")
     event.preventDefault();// it will stop the default execution of the event. use for form tag it will stop refreshing again an again.
    // to get access of the element on which this event was fired.
    const target = event.target;
    console.log(target);
    console.log(tierInput.value);
    if(tierInput.value == ''){
        alert('Please enter a tier name');
        return;
    }
    createTierList(tierInput.value);
    tierInput.value ='';
});
function createTierList(tierListName){
    const newTierList = document.createElement('div');
    newTierList.classList.add('tier-list');
    
    const heading = document.createElement('div');
    heading.classList.add('heading');

    const textcontainer = document.createElement('div');
    textcontainer.textContent = tierListName;


    heading.appendChild(textcontainer);

    const newTierListItems = document.createElement('div');
    newTierListItems.classList.add('tier-list-items');

    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);

    setUpDropZoneInTierList(newTierListItems);

    const tierSection = document.getElementById('tier-list-section');
    tierSection.appendChild(newTierList);
}

function createTierListItem(imageUrl){
    const imageDiv = document.createElement('div');
    imageDiv.setAttribute('draggable', 'true');
    imageDiv.classList.add('item-container');

    setUpItemCintainerForDrag(imageDiv);

    const img = document.createElement('img');
    img.src =imageUrl;
    imageDiv.appendChild(img);

    const nonTierSection = document.getElementById('non-tier-section');
    nonTierSection.appendChild(imageDiv);
}

function setUpItemCintainerForDrag(itemContainer){
    console.log(itemContainer);
    itemContainer.addEventListener('dragstart', (event) => {
    console.log(event.target.parentNode);
    currentDraggedItem = event.target.parentNode;
        console.log("Started dragging");
    });

    itemContainer.addEventListener('dblclick', (event) => {
            const parentNode = event.target.parentNode;
            const nonTierSection = document.getElementById('non-tier-section');
            nonTierSection.appendChild(parentNode);
        });
}

function setUpDropZoneInTierList(TierListItem){
    TierListItem.addEventListener('drop', (event) => {
        event.preventDefault(); // stops the default behaviour of the event which is to not allow drop.
    });

    TierListItem.addEventListener('dragover', function(event) {
        console.log("dragged over a drop zone");
        // console.log(event.target);
        // event.target.appendChild(currentDraggedItem);
        console.log("Event coming up", event);
        if(this != currentDraggedItem.parentNode) {
            this.appendChild(currentDraggedItem);
        }
    });
}