/**
 * IMPORTANTE: Importar los estilos aquí
 */
import './styles.scss';
import { Song } from './app/components/Song';
import appModule from './app/modules/app-module';

appModule();

window.playSong = function (songName) {
  const song = new Song();
  song.playAudio(songName);
}