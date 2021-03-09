// call
Function.prototype.call =  function(context,...args){
  if(typeof this !== 'funciton'){
    throw new TypeError('Not A Function!')
  }
  context = context || window
  args = args || []

  const key = Symbol()
  context[key] = this

  const result = context[key](...args)

  delete context[key]

  return result
}

// apply
Function.prototype.apply = function(context,args){
  if(typeof this !== 'function'){
    throw new TypeError('Not A Function!')
  }

  context = context || window
  args = args || []
  
  const key = Symbol()
  context[key] = this

  const result = context[key](...args)

  delete context[key]

  return result
}

// bind
Function.prototype.bind = function(context,...args){
  const func = this
  if(typeof func !== 'function'){
    throw new TypeError('Not A Function!')
  }
  
  args = args || []

  return function newFn(...newArgs){
    if(this instanceof newFn){
      return new func(...args, ...newArgs)
    }
    return func.apply(context,[...args,...newArgs])
  }
}