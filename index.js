import memory from './memory';

class Array {
  constructor () {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length)  // here we are just adding a pointer to this array that has no length
  }
  push(value) {
    if (this.length >= this._capacity) {
        this._resize((this.length + 1) * Array.SIZE_RATIO);
      }// this is resize the array.
    memory.set(this.ptr + this.length, value) // pointer starts at beginning, goes to end and sets a value
    this.length++; // the array length is one larger now that we added new value

  }
  _resize(size) {
    const oldPtr = this.ptr; // saying current pointer becomes old.
    this.ptr = memory.allocate(size); // new pointer is a new block of memory with defined size argument
    if (this.ptr === null) {
      throw new Error ('Out of Memory'); // if there is no more memory available, throw an error
    }
    memory.copy(this.ptr, oldPtr, this.length) // wehre you want to copy to, where you copy from, how many elements
    memory.free(oldPtr) // frees up existing memory. Does the Pointer know how long the existing array was?
    this._capacity = size;
  }
  get(index) {
    if(index < 0 || index >=this.length) { // if we access something that is not the index
      throw new Error ('Index error');
    }
    return memory.get(this.ptr + index); //start at the pointer add the index / access the value at the index.
  }
  pop() {
    if (this.length == 0) {
      throw new Error('Index Error')
    }
    const value = memory.get(this.ptr + this.length - 1)
    this.length --;
    return value;
  }
  insert(index, value) {
    if (index < 0 || index >=this.length) { // if we try to access something not in index
      this new Error ('Index error');
    }
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value)
    this.length++;
  }
  remove(index) {
    if (index < 0 || index >=this.length) {
      throw new Error('index error');
    }
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
  }
}
Array.SIZE_RATIO = 3;

// let arr = new Array();
// arr.push('Brian')
