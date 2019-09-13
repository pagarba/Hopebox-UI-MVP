
export const del = k => localStorage.removeItem(k)

export const get = k => {
  try {
    const v = localStorage.getItem(k)
    return JSON.parse(v)
  } catch(err) {
    console.log(err)
    return null
  }
}

export const keys = o => Object.keys(o)

export const set = (k, v) => {
  localStorage.setItem(k, JSON.stringify(v))
}

export const ucFirst = s => `${s.substr(0, 1).toUpperCase()}${s.substr(1).toLowerCase()}`

export default {
  del,
  get,
  keys,
  set,
  ucFirst,
}
