//https://openapi.programming-hero.com/api/ai/tools
//Single data details: https://openapi.programming-hero.com/api/ai/tool/${id}

//Single data Example: https://openapi.programming-hero.com/api/ai/tool/01

const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(Data => displayData(Data.data))
        
}

const displayData = data => {
    const tools=data.tools;
    const dataContainer = document.getElementById('data-container')
    tools.forEach(tool => {
        console.log(tool);
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('col');
        dataDiv.innerHTML = `<div class="card h-100">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div class="card-footer">
                      <small class="text-body-secondary">Last updated 3 mins ago</small>
                    </div>
                  </div>`
        dataContainer.appendChild(dataDiv);

    });

}

loadData();
