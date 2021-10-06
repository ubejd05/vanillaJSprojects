const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');



const apiURL = 'https://api.lyrics.ovh';


// Search by song or artist 
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`)
  const data = await res.json();
  console.log(data);
  
  showData(data)
}

// Show song and artist in DOM
function showData(data) {
  // let output = "";
  // data.data.forEach((song) => {
  //   output += `
  //   <li>
  //     <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //     <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}"
  //     >Get Lyrics</button>
  //   </li>
  //   `;
  // })
  // result.innerHTML = `
  //   <ul class="songs">
  //     ${output}
  //   </ul>
  // `;


  result.innerHTML = `
    <ul class="songs">
      ${data.data.map((song) =>
        `<li>
          <span><strong>${song.artist.name}</strong> - ${song.title}</span>
          <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}"
          >Get Lyrics</button>
        </li>`
      ).join('')}
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
      ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
    `; 
  } else 
  more.innerHTML = '';
}

async function getMoreSongs(url) {
  let x = `https://${url.slice(7)}`;
  console.log(`${x}`);
  const res = await fetch(x, {headers:{
    'Access-Control-Allow-Origin': '*',
  }});
  const data = await res.json();
  console.log(data);
  
  // showData(data)
}


// Event listeners
form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value.trim()
  
  if (!searchTerm) {
    alert('Please type in a search term')
  } else {
    searchSongs(searchTerm)
  }
})


// http://api.deezer.com/search?limit=15&q=one&index=15




// function digital_root(n) {
//   let total = 0;
//   Array.from(String(n)).forEach((item) => total += parseInt(item))
//   if(String(total).length > 1) {
//     digital_root(total)
//   } else {
//     return total;
//   }
// }




// function createPhoneNumber(numbers){
//   let a = numbers.slice(0, 3);
//   let b = numbers.slice(3, 6);
//   let c = numbers.slice(6);
  
//   return `(${a}) ${b}-${c}`;
// }



// function duplicateEncode(word){
//   const wordArr = Array.from(word);
  
//   wordArr.forEach((item, index) => {
//     if(wordArr.indexOf(item, index+1) > -1 ) {
//       wordArr.splice(index, ')')
//     } else {
//       wordArr.splice(index, '(')
//     }
//   })
  
//   return wordArr.join('');
// }



