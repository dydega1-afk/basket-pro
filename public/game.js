'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const play = $('play'), ball = $('game-ball');
  let best = 0;
  try { best = Math.max(0, Number(localStorage.getItem('basket-pro-best')) || 0); } catch {}
  let score = 0, active = false, deadline = 0, started = 0, position = 0, frame = 0, lockedUntil = 0;
  const format = value => String(value).padStart(2, '0');
  $('best').textContent = format(best);
  function finish() {
    active = false;
    cancelAnimationFrame(frame);
    $('time').textContent = '0';
    $('feedback').textContent = `¡Tiempo! Conseguiste ${score} puntos. ¿Otra ronda?`;
    play.textContent = 'Jugar de nuevo ↗';
  }
  function tick(now) {
    if (!active) return;
    if (now >= deadline) { finish(); return; }
    position = (Math.sin((now - started) / 460 - Math.PI / 2) + 1) * 50;
    $('marker').style.left = `${position}%`;
    $('time').textContent = String(Math.ceil((deadline - now) / 1000));
    frame = requestAnimationFrame(tick);
  }
  function start() {
    cancelAnimationFrame(frame);
    score = 0; active = true; started = performance.now(); deadline = started + 30000; lockedUntil = 0;
    $('score').textContent = '00'; $('time').textContent = '30';
    $('feedback').textContent = '¡Vamos! Tira cuando el indicador esté en naranja.';
    play.textContent = 'Tirar · Espacio ↗';
    tick(started);
  }
  play.addEventListener('click', () => {
    if (!active) { start(); return; }
    const now = performance.now();
    if (now >= deadline) { finish(); return; }
    if (now < lockedUntil) return;
    lockedUntil = now + 550;
    const made = position >= 40 && position <= 60;
    ball.className = `game-ball ${made ? 'made' : 'miss'}`;
    if (made) {
      score += 2;
      $('score').textContent = format(score);
      $('feedback').textContent = '¡Canasta! +2 puntos. Sigue así.';
      if (score > best) {
        best = score; $('best').textContent = format(best);
        try { localStorage.setItem('basket-pro-best', String(best)); } catch {}
      }
    } else $('feedback').textContent = 'Casi… Busca el centro y vuelve a tirar.';
  });
  ball.addEventListener('animationend', () => { ball.className = 'game-ball'; });
  play.addEventListener('keydown', event => { if (event.repeat) event.preventDefault(); });
  $('reset').addEventListener('click', () => {
    active = false; cancelAnimationFrame(frame); score = 0; position = 0;
    $('score').textContent = '00'; $('time').textContent = '30'; $('marker').style.left = '0%';
    ball.className = 'game-ball'; $('feedback').textContent = 'La cancha está lista. Te toca.';
    play.textContent = 'Comenzar ↗';
  });
})();
