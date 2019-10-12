const label = document.getElementById('label');
const body = document.querySelector('body');
const main = document.getElementById('main');
const loader = document.getElementById('loader');
//form nodes
const amount = document.getElementById('amount');
const fetchPrice = document.getElementById('fprice');
const convert = document.getElementById('convert');
const fetchPriceCoin = document.getElementById('fpriceCoin');
const fetchPriceMoney = document.getElementById('fpriceMoney');
const convertPriceCoin = document.getElementById('cpriceCoin');
const convertPriceMoney = document.getElementById('cpriceMoney');
const fetchpans = document.getElementById('fpans');
const convertpans = document.getElementById('cpans');
body.addEventListener('click', function(e){
    if(document.activeElement.id == 'amount'){
        label.style.fontSize = "0.8rem";
        label.style.top = "14vw";
    } else {
        if(amount.value.length == 0){
        label.style.fontSize = "1.4rem";
        label.style.top = "18vw";
        }
    }
})


//fetching price
//style chaging function here
function changeS(b){
    if(b){
        main.style.filter = "blur(5px)";
        loader.style.transform = "scale(1)";
    } else {
        main.style.filter = "blur(0)";
        loader.style.transform = "scale(0)";
    }
}
fprice.addEventListener('click', function(e){
    e.preventDefault();
    changeS(true);
    //fetching details
    let url = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/' + fetchPriceCoin.value + fetchPriceMoney.value;
    fetch(url)
    .then(
        function(response) {
        if (response.status !== 200) {
            alert("An error with description (" + response.status + ") ocurred try contacting the developer");
            changeS(false);
            return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
            changeS(false);
            fetchpans.textContent = data.ask;
        });
        }
    )
    .catch(function(err) {
        alert("Please turn on the mobile data to fetch details");
        changeS(false);
    });

})

convert.addEventListener('click', function(e){
    e.preventDefault();
    if(amount.value == ''){
        alert('Please enter an amount to convert');
    } else{
        changeS(true);
    let url = 'https://apiv2.bitcoinaverage.com/convert/global?from=' + convertPriceCoin.value + '&to=' + convertPriceMoney.value +'&amount=' + amount.value;
    console.log(url);
    fetch(url)
    .then(
        function(response){
            if(response.status !== 200){
                alert("An error with description (" + response.status + ") ocurred try contacting the developer");
                changeS(false);
                return;
            }
            //Examine the text in the response
            response.json().then(function(data){
                changeS(false);
                convertpans.textContent = data.price;
            });
        }
    )
    .catch(function(err){
        alert("Please turn on the mobile data to fetch details");
        changeS(false);
    })
    }
})