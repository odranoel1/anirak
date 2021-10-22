/*=== Custom Javascript === */
import { AnimationPage } from '../components/AnimationPage';
import { AnimationObserver } from '../components/AnimationObserver';
import { RegisterForm } from '../components/RegisterForm';
import { Relation } from '../components/Relation';
import TinySlider from '../components/TinySlider';
import { TaskList } from '../components/TaskList';

const animation = new AnimationPage();
const observer = new AnimationObserver();
const registerForm = new RegisterForm();
const relation = new Relation();
const taskList = new TaskList();

export default () => {
    animation.clickHamburguer();
    animation.scrollTop();
    animation.menuFixed();
    animation.scrollToSection();
    animation.toggleServices();
    animation.hoverServices();
    observer.services
    observer.phrase2
    observer.companies
    observer.plans
    observer.about
    observer.footerimg
    registerForm.validateForm();
    relation.getMonth();
    relation.createMonth();
    relation.getRelationDate();
    relation.getPictures();
    TinySlider;
    taskList.listenInput();
    taskList.listenTodo();
}