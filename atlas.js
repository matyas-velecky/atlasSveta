const countriesList = document.getElementById("countries-list");
const continent = document.getElementById("continent");
const modalBody = document.getElementById("modal-body-content");
const modalHeader = document.getElementById("modal-header-content");
const modal = new bootstrap.Modal(document.getElementById("one-country"));

function loadCountries(region) {
    countriesList.innerHTML = "";
    fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then(res => res.json())
    .then(data => {
        data.forEach((country) => {
            //console.log(country);
            let blockCountry = `
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div class="card">
                        <img class="card-img-top country-flag border border-2 border-secondary" src="${country.flags.png}" alt="Vlajka ${country.name.common}"/>
                        <div class="card-body">
                            <h4 class="card-title">${country.translations.ces.common}</h4>
                            <p class="card-text">Hlavní město: <b>${country.capital[0]}</b></p>
                            <p><button class="btn btn-success" 
                                data-name="${country.name.common}">Informace</button></p>
                        </div>
                    </div>                                        
                </div>            
            `;
            countriesList.innerHTML += blockCountry;
        });
        document.querySelectorAll('button[data-name]').forEach(button => {
            button.addEventListener('click', () => {
                const countryName = button.getAttribute('data-name');
                modal.show();
                fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText-true`)
                .then(res => res.json())
                .then(data => {
                    const country = data[0];
                    modalHeader.innerHTML = `
                        <h4>${country.translations.ces.common}</h4>
                    `;
                    modalBody.innerHTML = `
                        <p><img class="border" src=" ${country.flags.png}" alt="Vlajka ${country.name.common}"<p>
                        <p><b>${country.name.translations.ces.common}</b> je stát, jehož hlavní město je <b>${country.capital[0]}/b>.<br>
                            <b>${country.name.translations.ces.common}</b> používá měnu jménem <b>${country.currencies[0].name}</b>.<br>
                            Jazykem tohoto státu je <b>${country.languages[0]}</b>.
                        <p>
                        
                        
                    `;
                })
                .catch(error => {
                    console.log(`Nastala chyba: ${error}`);
                })
            });
        });                
    })
    .catch(error => {
        console.log(error);
    });
}


loadCountries("europe");

continent.addEventListener("change", function(event) {
    loadCountries(event.target.value);
});
