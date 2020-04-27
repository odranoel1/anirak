/*=== Custom Javascript === */
import { AnimationPage } from '../components/AnimationPage';
import { AnimationObserver } from '../components/AnimationObserver';
import { RegisterForm } from '../components/RegisterForm';

let animation = new AnimationPage();
let observer = new AnimationObserver();
let registerForm = new RegisterForm();

export default () => {
    animation.clickHamburguer();
    animation.scrollTop();
    animation.menuFixed();
    animation.scrollToSection();
    animation.toggleServices();
    animation.hoverServices();
    observer.services
    observer.globe
    observer.companies
    observer.plans
    observer.location
    observer.footerimg
    registerForm.validateForm();
}