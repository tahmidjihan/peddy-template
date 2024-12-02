async function loadCategoryCards() {
  const fetched = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await fetched.json();

  data.categories.forEach((e) => {
    const card = `
                <btn
                id="${e.category}"
              class="category-card card btn p-5 flex bg-white  rounded-md min-h-[100px] flex-row mx-auto md:mx-[12px] border w-[250px] justify-center gap-10 items-center">
              <img src="${e.category_icon}" alt=""/>
              <h1 class="text-3xl font-extrabold ">${e.category}</h1>
            </btn>`;
    const cardParent = document.getElementById('pet-category-cards');
    cardParent.innerHTML += card;
  });
}
loadCategoryCards();

async function loadCardsOnLoad() {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  const data = await res.json();
  const petData = await data.pets;
  loadContent(petData);
}
loadCardsOnLoad();
function loadContent(petData) {
  sortByPrice(petData);

  const cardParent = document.querySelector('.main-cards');
  cardParent.innerHTML = '';
  cardParent.innerHTML = ` 
         <div></div>
   <span class="loading loading-infinity loading-lg mx-auto "></span>`;

  setTimeout(() => {
    cardParent.classList.remove('bg-[#13131308]');
    cardParent.removeChild(cardParent.firstElementChild);
    cardParent.removeChild(cardParent.firstElementChild);

    petData.forEach((pet) => {
      const card = `
      <div
    class="card bg-base-100 w-[312px] lg:w-[250px] xl:w-[312px] h-[460px] border border-base-300 shadow-none mx-auto">
    <figure class="p-2 w-[272px] xl:w-[272px] lg:w-[242px]  lg:h-[170px] h-[160px] mx-auto mt-4 mb-1">
      <img
        src="${pet.image}"
        alt="Shoes"
        class="rounded-xl lg:h-[170px]" />
    </figure>
    <div class="card-body">
      <h2 class="card-title font-">${pet.pet_name}</h2>
      <ul class="text-[#131313B3]">
        <li class="flex gap-1 h-[20px] align-middle justify-start mt-1 lg:text-sm xl:text-start">
          <img
            src="https://img.icons8.com/?size=100&id=AxftWqUZiY6Y&format=png&color=131313B3"
            alt="" />Breed: ${pet.breed || 'not included'}
        </li>
        <li class="flex gap-1 h-[20px] align-middle justify-start mt-1">
          <img
            src="https://img.icons8.com/?size=100&id=8yG2a6v2mm3S&format=png&color=131313B3"
            alt="" />
          ${pet.date_of_birth || 'not included'}
        </li>
        <li class="flex gap-1 h-[20px] align-middle justify-start mt-1">
          <img
            src="https://img.icons8.com/?size=100&id=36611&format=png&color=131313B3"
            alt="" />Gender: ${pet.gender || 'not included'}
        </li>
        <li class="flex gap-1 h-[20px] align-middle justify-start mt-2">
          <img
            src="https://img.icons8.com/?size=100&id=85801&format=png&color=131313B3"
            alt="" />Price: ${pet.price || 'not included'}
        </li>
      </ul>
      <hr class="mt-1 border-[#1313131A]" />
      <div class="card-actions flex flex-row justify-around lg:justify-normal xl:justify-around">
        <button class="likePet btn border bg-white border-[#13131348] lg:w-10"
        id="${pet.petId}">
          <i class="fa-regular fa-thumbs-up text-[25px] text-[#131313B3]" 
          id="${pet.petId}"></i>
        </button>
        <button
          class="adoptPet btn border w-16 font-extrabold bg-white border-[#13131348] text-[#0E7A81]"
          id="${pet.petId}">
          Adopt
        </button>
        <button
          class="detailsPet btn border w-16 font-extrabold bg-white border-[#13131348] text-[#0E7A81]"
          id="${pet.petId}">
          Details
        </button>
      </div>
    </div>
  </div>
      `;
      cardParent.innerHTML += card;
    });
    if (cardParent.innerText === '') {
      cardParent.classList.add('bg-[#13131308]');

      cardParent.innerHTML = `
      <div></div>
                    <div
                class="flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto align-middle place-self-center">
                <img src="images/error.webp" alt="" class="max-h-[146.6px]" />
                <h1 class="text-[32px] leading-[39px] mt-[30px] font-extrabold">
                  No Information Available
                </h1>
                <p class="text-[#131313B3]">
                  We apologize, but at this time, we don't have any information     
                  available. Please check back soon, as we regularly update our
                  listings to help you find the perfect pet for your family.
                  Thank you for your patience!
                </p>
              </div>
      `;
    }
  }, 2000);
  return petData;
}
function addCardByCategory() {
  const cardParent = document.getElementById('pet-category-cards');

  cardParent.addEventListener('click', async (e) => {
    const category = e.target.id.toLowerCase();
    const categoryPar = e.target.parentElement.id.toLowerCase();
    setTimeout(() => {
      const cards = document.getElementsByClassName('category-card');
      for (let card of cards) {
        card.classList.remove(
          'bg-[#0E7A811A]',
          'rounded-full',
          'border-[#0e7a81]'
        );
        card.classList.add('bg-white', 'rounded-md');
        if ('' || categoryPar === 'pet-category-cards') {
          e.target.classList.remove('bg-white', 'rounded-md');
          e.target.classList.add(
            'bg-[#0E7A811A]',
            'rounded-full',
            'border-[#0e7a81]'
          );
        } else {
          e.target.parentElement.classList.remove('bg-white', 'rounded-md');
          e.target.parentElement.classList.add(
            'bg-[#0E7A811A]',
            'rounded-full',
            'border-[#0e7a81]'
          );
        }
      }
    });

    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${
        '' || categoryPar === 'pet-category-cards' ? category : categoryPar
      }`
    );
    if (!res.ok) {
      throw err;
    }

    const data = await res.json();
    const petData = data.data;
    if (
      e.target.classList.contains('btn') ||
      e.target.parentElement.classList.contains('btn')
    ) {
      loadContent(petData);
    }
    cardActions();
  });
}
addCardByCategory();
function cardActions() {
  setTimeout(() => {
    const parents = document.querySelectorAll('.card-actions');
    parents.forEach((parent) => {
      parent.addEventListener('click', (e) => {
        if (
          e.target.classList.contains('btn') ||
          e.target.parentElement.classList.contains('btn')
        ) {
          if (e.target.innerText !== 'Adopt') {
            const targetId = e.target.id;

            async function loadById() {
              const res = await fetch(
                `https://openapi.programming-hero.com/api/peddy/pet/${targetId}`
              );
              const data = await res.json();
              const pet = await data.petData;
              if (e.target.innerText !== 'Details') {
                const cards = document.getElementById('cards-of-liked');
                const image = data.petData.image;
                const card = `
                                  <figure
                    class="w-[124px] h-[124px] overflow-hidden rounded-md m-[10px]">
                    <img
                      src="${image}"
                      alt=""
                      class="w-full h-full object-cover object-center" />
                  </figure>
                `;
                cards.innerHTML += card;
              } else if (e.target.innerText === 'Details') {
                const detailsModal =
                  document.getElementById('detail-modal-main');
                const theModal = document.getElementById('details_modal');
                theModal.showModal();
                detailsModal.innerHTML = `<div class="flex items-center">
                  <span class="loading loading-infinity loading-lg mx-auto"></span>
                  </div>`;
                setTimeout(() => {
                  detailsModal.innerHTML = `
                  
            <figure class="w-[230px] md:w-[400px] mx-auto mb-1">
              <img
                src="${pet.image}"
                alt="Shoes"
                class="rounded-xl w-[230px] md:w-[400px]" />
            </figure>
            <div class="card-body">
              <h2 class="card-title font-">${pet.pet_name}</h2>
              <ul class="text-[#131313B3] flex gap-8 flex-wrap">
                <ul>
                  <li
                    class="flex gap-1 h-[20px] align-middle justify-start mt-1">
                    <img
                      src="https://img.icons8.com/?size=100&id=AxftWqUZiY6Y&format=png&color=131313B3"
                      alt="" />Breed: ${pet.breed || 'not included'}
                  </li>
                  <li
                    class="flex gap-1 h-[20px] align-middle justify-start mt-1">
                    <img
                      src="https://img.icons8.com/?size=100&id=8yG2a6v2mm3S&format=png&color=131313B3"
                      alt="" />
                    Birth: 29/ 3/ 24
                  </li>
                  <li
                    class="flex gap-1 h-[20px] align-middle justify-start mt-1">
                    <img
                      src="https://img.icons8.com/?size=100&id=36611&format=png&color=131313B3"
                      alt="" />Vaccinated: ${
                        pet.vaccinated_status || 'not included'
                      }
                  </li>
                </ul>
                <ul>
                  <li
                    class="flex gap-1 h-[20px] align-middle justify-start mt-1">
                    <img
                      src="https://img.icons8.com/?size=100&id=36611&format=png&color=131313B3"
                      alt="" />Gender: ${pet.gender || 'not included'}
                  </li>
                  <li
                    class="flex gap-1 h-[20px] align-middle justify-start mt-2">
                    <img
                      src="https://img.icons8.com/?size=100&id=85801&format=png&color=131313B3"
                      alt="" />Price: ${pet.price || 'not included'}
                  </li>
                </ul>
              </ul>
              <hr class="mt-1 border-[#1313131A]" />
              <div class="details mt-2">
                <h2 class="text xl font-bold">Details Information</h2>
                <p class="text-[#131313a2]">${pet.pet_details}</p>
              </div>
            </div>
                  `;
                }, 2600);
              }
            }
            loadById();
          } else if (e.target.innerText === 'Adopt') {
            const adoptModal = document.getElementById('congrats_modal');
            const countdown = document.getElementById('countdown');
            countdown.innerHTML = '3';
            e.target.setAttribute('disabled', '');
            e.target.innerText = 'adopted';
            adoptModal.showModal();
            let time = 1;
            const countdownInterval = setInterval(() => {
              time++;
              if (time == 2) {
                countdown.innerHTML = '2';
              } else if (time == 3) {
                countdown.innerHTML = '1';
              } else if (time == 4) {
                countdown.innerHTML = '';
                clearInterval(countdownInterval);
                adoptModal.close();
              }
            }, 1000);
          }
        }
      });
    });
  }, 2300);
}
cardActions();
function sortByPrice(petData) {
  let petInfo = petData;

  const sortByPriceBtn = document.getElementById('sortByPrice');
  sortByPriceBtn.onclick = () => {
    const cardParent = document.querySelector('.main-cards');
    cardParent.innerHTML = '';
    cardParent.innerHTML =
      '<span class="loading loading-infinity loading-lg"></span>';
    if (typeof petInfo == 'object') {
      petInfo.sort((a, b) => {
        if (a.price == null || undefined) return 1;
        if (b.price == null || undefined) return -1;
        return b.price - a.price;
      });
      loadContent(petInfo);
      cardActions();
    }
  };
}
