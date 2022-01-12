/*=== Custom Javascript === */
import { AnimationPage } from '../components/AnimationPage';
import { RegisterForm } from '../components/RegisterForm';
import { Relation } from '../components/Relation';
import TinySlider from '../components/TinySlider';
import { TaskList } from '../components/TaskList';
import { Picture } from '../components/Picture';

const animation = new AnimationPage();
const registerForm = new RegisterForm();
const relation = new Relation();
const taskList = new TaskList();
const picture = new Picture();

export default () => {
    animation.clickHamburguer();
    animation.scrollTop();
    animation.menuFixed();
    animation.scrollToSection();
    animation.toggleServices();
    animation.hoverServices();
    registerForm.validateForm();
    relation.getRelationDate();
    relation.listenPicture();
    relation.listenSendPicture();
    TinySlider;
    taskList.listenInput();
    taskList.listenTodo();
    picture.listenAfterFile();
    picture.listenSendFile();
}