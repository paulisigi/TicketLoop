async function getUserInfo() {
    try {
        const response = await fetch('/foryou/user');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
const userData = getUserInfo().then(userDatas => {
  console.log(userDatas);
  return userDatas;
});


function insertUserInfo() {
    const username = document.querySelector('.username');
    username.value = userData.name;
}
