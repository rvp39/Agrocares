window.addEventListener('load', ()=> {
    //deifne the co-ordinates
    let long;
    let lat;

    //get the elements
    let location = document.querySelector(".location");
    let temperature = document.querySelector(".temperature")
    let degree = document.querySelector(".degree");
    let description = document.querySelector(".description");
    let wicon = document.querySelector(".wicon");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f65e73a0e20a75ef3b76900e231e9257`;

            fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            console.log(data);
            const place = data.name;
            const temp = data.main.temp;
            const summary = data.weather[0].description;
            const id = data.weather[0].id;
            /*const iconcode = data.weather[0].icon;
            const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";*/

            

            //set DOM from API
            temperature.textContent = Math.floor(temp - 273);
            description.textContent = summary;
            location.textContent = place;
            //wicon.setAttribute("src", iconurl);
            

            //set icon
            //setIcons(icon, document.querySelector(".icon"));
            

            /*<250 - thunder
            250< id <350 - drizzle
            350< id < 500 - rain
            800 == clear
            800< id - cloudy*/


            if(id < 250){
                wicon.src = "./icons/thunder.svg";
            }
            else if(id < 350){
                wicon.src = "./icons/rainy-7.svg";
            }
            else if(id < 500){
                wicon.src = "./icons/rainy-6.svg";
            }
            else if(id === 800){
                wicon.src = "./icons/day.svg";
            }
            else if(id > 800){
                wicon.src = "./icons/cloudy.svg";
            }

        })
        });
        
    }
    
    /*function setIcons(icon, iconId){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.split(" ").join("_").toUpperCase();
        
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }*/

});








