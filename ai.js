const toggleSpinner = isLoading => {
  const loaderSec = document.getElementById('loader');
  if (isLoading) {
    loaderSec.classList.remove('d-none');
  }
  else {
    loaderSec.classList.add('d-none');
  }
}

const loadData = () => {
  toggleSpinner(true);
  fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(Data => {
      displayData(Data.data);
      toggleSpinner(false);
    })
}

const displayData = data => {
  let tools = data.tools;
  const dataContainer = document.getElementById('data-container');
  const seeMore = document.getElementById('see-more');

  const initialDisplayTools = tools.slice(0, 6);
  initialDisplayTools.forEach(tool => {
    const dataDiv = document.createElement('div');
    dataDiv.classList.add('col');
    dataDiv.innerHTML = `<div class="card h-100">
                            
                            <img src="${tool.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5>Features</h5>
                              <ol type="1">
                                ${tool.features.map(feature => `<li>${feature}</li>`).join('')}
                              </ol>
                              <button onclick="loadToolDetails(${tool.id})" href="#" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                            </div>
                            <div class="card-footer">
                              <h5 class="card-title">${tool.name}</h5>
                              <small class="text-body-secondary">${tool.published_in}</small>
                            </div>
                          </div>`;
    dataContainer.appendChild(dataDiv);
  });

  if (tools.length > 6) {
    seeMore.classList.remove('d-none');
    seeMore.onclick = () => {
      dataContainer.innerHTML = '';
      tools.forEach(tool => {
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('col');
        dataDiv.innerHTML = `<div class="card h-100">
                                <img src="${tool.image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                  <ol type="1">
                                    ${tool.features.map(feature => `<li>${feature}</li>`).join('')}
                                  </ol>
                                </div>
                                <div class="card-footer">
                                  <h5 class="card-title">${tool.name}</h5>
                                  <small class="text-body-secondary">${tool.published_in}</small>
                                </div>
                              </div>`;
        dataContainer.appendChild(dataDiv);
      });
      seeMore.classList.add('d-none');
    };
  } else {
    seeMore.classList.add('d-none');
  }
}
const loadToolDetails = id => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res => res.json())
    .then(data => displayToolDetails(data.data))

}
const displayToolDetails = tool => {
  const modalDes = document.getElementById('description');
  modalDes.innerHTML = `
    <p>${tool.description ? tool.description : 'No description available.'}</p>
    <ul>
      ${tool.features ? tool.features.map(feature => `<li>${feature}</li>`).join('') : '<li>No features available.</li>'}
    </ul>
  `;
}



loadData();

