function message(type, message)
{
  // For new messages: Fade out current message, change content, show new message , wait, fade out message
  // For repeated messages: Flash existing message
  if (type == 'error')
  {
    if ($('#errorBox').html() == message)
    {
      $('#errorBox').clearQueue().fadeOut(0).delay(200).fadeIn(0).delay(2000).fadeOut(1000);
    }
    else
    {
      $('#errorBox').fadeOut(1000).queue(function(){$(this).html(message);$(this).dequeue();}).fadeIn(0).delay(2000).fadeOut(1000);
    }
  }
  else if (type == 'success')
  {
    if ($('#successBox').html() == message)
    {
      $('#successBox').clearQueue().fadeOut(0).delay(200).fadeIn(0).delay(2000).fadeOut(1000);
    }
    else
    {
      $('#successBox').fadeOut(1000).queue(function(){$(this).html(message);$(this).dequeue();}).fadeIn(0).delay(2000).fadeOut(1000);
    }
  }
  else
  {
    message('error', 'Invalid message type');
  }
}