const select = document.querySelector('select');
const country = document.querySelector('#country')
const linkedButton = document.querySelector('.submit')
const form = document.querySelector('form')
const error = document.querySelector('.error');

fetch(`https://restcountries.com/v3.1/all`)
.then(response => response.json())
.then(result =>{
    result.forEach(element => {
      const option = document.createElement('option')
      option.text = element.name.common;
      option.value = element.name.common;
      country.append(option);
    });
})

error.style.color = 'red'
linkedButton.onclick = async(e) =>{
  e.preventDefault();
  if(form.title.value !== '' &&  form.fullname.value !== '' && form.country.value !== '' &&
  form.email.value !== '' && form.password.value !== '' && form.church.value !== '' &&
  form.responsibility.value !== '' && form.category.value !== ''
  ){ 
      if(form.password.value !== form.confirm.value && form.password.value.toString().length < 6){
        const error = document.querySelector('.error');
        error.innerHTML = 'Your password must match and should be greater than 6 characters'
      }else{
        const params = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: form.title.value,
            fullname: form.fullname.value,
            country: form.country.value,
            email: form.email.value,
            password: form.password.value,
            church: form.church.value,
            responsibility: form.responsibility.value,
            category: form.category.value,
          })
        }

      const posted = await fetch(`/register`, params)
       window.location.href =  '/'
      }
  }else{  
    const error = document.querySelector('.error');
    error.innerHTML = 'Fill all required details'
  }

  
}

form.previous[1].onclick = () =>{
  const error = document.querySelector('.error')
  error.style.display = 'none'
}
// ................Submit Handle...........................