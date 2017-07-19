(()=>'strict-mode')();

const audioContext = new AudioContext()

play(0, 3, 0.5)
play(1, 10, 0.5)
play(2, 15, 0.5)

function play (delay, pitch, duration) {
  let startTime = audioContext.currentTime + delay
  let endTime = startTime + duration

  const envelope = audioContext.createGain()
  envelope.connect(audioContext.destination)
  envelope.gain.value = 0
  envelope.gain.setTargetAtTime(1, startTime, 0.1)
  envelope.gain.setTargetAtTime(0, endTime, 0.2)

  const oscillator = audioContext.createOscillator()
  oscillator.connect(envelope)

  oscillator.type = 'sawtooth'
  oscillator.detune.value = pitch * 100
  
  const vibrato = audioContext.createGain()
  vibrato.gain.value = 30
  vibrato.connect(oscillator.detune)
  
  const lfo = audioContext.createOscillator()
  lfo.connect(vibrato)
  lfo.frequency.value = 5
  
  lfo.start(audioContext.currentTime)

  oscillator.start(startTime)
  oscillator.stop(endTime + 2)
}
