const user = {
  state: {
    userId: '',
    userName: '',
    gender: '',
    province: '',
    city: '',
    birthday: '',
    imgUrl: ''
  },

  mutations: {
    SET_USER: (state, user) => {
      state.userId = user.userId
      state.userName = user.userName
      state.gender = user.gender
      state.province = user.province
      state.city = user.city
      state.birthday = user.birthday
      state.imgUrl = user.imgUrl
    }
  }
}

export default user
