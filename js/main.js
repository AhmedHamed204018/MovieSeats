const container = document.querySelector('.container');
const seats =document.querySelectorAll('.row .seat:not(.occupied)');
const count=document.getElementById('count');
const total= document.getElementById('total');
const movieSelect=document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//save selected movie index and price

function setMovieDate(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex)
    localStorage.setItem('selectedMoviePrice',moviePrice)

}

//update total and count

function updatedSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatIndex =[...selectedSeats].map(seat =>[...seats].indexOf(seat));
  localStorage.setItem('selectedSeats',JSON.stringify(seatIndex));


  const selectedSeatsCount = selectedSeats.length;

  count.innerHTML = selectedSeatsCount;
  total.innerHTML = selectedSeatsCount * ticketPrice;
}
//get data from localstorage

function populateUI()
{
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); 

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex;
  }

}



//movie select event

movieSelect.addEventListener('change', e =>{
    ticketPrice = +e.target.value;
    setMovieDate(e.target.selectedIndex , e.target.value)
    updatedSelectedCount();
})


container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !(e.target.classList.contains('oocupied')))
    {
        e.target.classList.toggle('selected')
        updatedSelectedCount();

    }

});

//intial count and total
updatedSelectedCount();