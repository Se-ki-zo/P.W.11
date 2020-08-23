class UserInfo {
    constructor(userNameHTML, userAboutHTML, userPhotoHTML) {
        this.userNameHTML = userNameHTML;
        this.userAboutHTML = userAboutHTML;
        this.userPhotoHTML = userPhotoHTML;
    }

    setUserInfo(userElement, aboutElement) {
        this.userElement = userElement;
        this.aboutElement = aboutElement;

        this.updateUserInfo();
    }

    updateUserInfo() {
        this.userNameHTML.textContent = this.userElement;
        this.userAboutHTML.textContent = this.aboutElement;
    }

    updateUserPhoto(userPhoto) {
        this.userPhotoHTML.setAttribute('style', `background-image: url(${userPhoto})`); 
    }
}