import Vue from 'vue'

const getRefElement = (component: Vue, ref: string): any => {
  return component.$refs[ref]
}

export {
  getRefElement
}
