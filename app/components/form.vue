<template>
<div class="relative -mt-20">
  <div class="relative">
    <NuxtImg src="/pic/form/solvette.png" class="absolute top-0 w-[40%] z-1"/>
    <NuxtImg src="/pic/form/title.png" class="relative pl-25 pt-30 z-10"/>
    <p class="relative z-10 pl-55 text-3xl transform text-black font-semibold font-[kosmos]">
      чтобы всё прошло красиво
    </p>
  </div>
  <div class="relative -mt-5 h-50">
    <NuxtImg src="/pic/form/bg1.png" class="absolute top-0"/>
    <p class="relative py-20 px-10 z-10 text-[1.2rem]/[1.2] text-center font-[consolas]">
      Пожалуйста, заполните анкету и подтвердите ваше присутствие
      на нашем празднике до <b>25 августа 2025</b>
    </p>
  </div>
  <div class="max-w-xl mx-auto px-15 pt-5 pb-20 space-y-6">
    <UForm :validate="validate" :state="form" class="space-y-4" @submit="submitForm">
      <UFormField  label="Имя" name="firstName" class="text-[1.5rem]/[1.2]">
        <UInput v-model="form.firstName" color="neutral" class="w-full" placeholder="Ваше имя" size="xl" />
      </UFormField >

      <UFormField  label="Фамилия" name="lastName" class="text-[1.5rem]/[1.2]">
        <UInput v-model="form.lastName" color="neutral" class="w-full" placeholder="Ваша фамилия" size="xl" />
      </UFormField >

      <UFormField  label="Сможете ли вы быть с нами в этот день?" name="attendance"  class="text-[1.5rem]/[1.2]" >
        <URadioGroup v-model="form.attendance" color="neutral" :items="attendanceOptions" size="xl" :ui="ui"/>
      </UFormField >

      <UFormField  label="Нужна ли вам помощь с трансфером?" name="transferHelp" class="text-[1.5rem]/[1.2]">
        <URadioGroup v-model="form.transferHelp"  color="neutral" :items="transferOptions" size="xl" :ui="ui"/>
      </UFormField >

      <UFormField  label="Уточните предпочтения по напиткам" name="drinks" class="text-[1.5rem]/[1.2]" >
        <UCheckboxGroup v-model="form.drinks" color="neutral" :items="drinkOptions" size="xl" :ui="{wrapper: 'text-[1.5rem]/[1.2]', item: 'py-1'}"/>
      </UFormField >

      <UButton type="submit" color="primary" :loading="loading" size="xl" class="w-full justify-center text-[1.5rem]/[1.2] text-black">Отправить</UButton>
    </UForm>

    <div class="flex" v-if="status">
      <NuxtImg src="/pic/dancing-white-cat-dance.gif"/>
      <UAlert :color="statusColor" :title="status"/>
    </div>
  </div>
</div>
</template>


<script setup lang="ts">
const form = ref({
  firstName: null,
  lastName: null,
  attendance: null,
  transferHelp: null,
  drinks: []
})

const loading = ref(false)
const status = ref('')
const statusColor = ref('gray')

const attendanceOptions = [
  { label: 'Да, конечно! 🎉', value: 'да' },
  { label: 'Увы, не получится 🙁', value: 'нет' }
]

const transferOptions = [
  { label: 'Да', value: 'да' },
  { label: 'Нет', value: 'нет' }
]

const drinkOptions = [
  { label: 'Шампанское', value: 'шампанское' },
  { label: 'Вино', value: 'вино' },
  { label: 'Безалкогольное', value: 'безалкогольное' },
  { label: 'Крепкое', value: 'крепкое' }
]

const validate = (state: any): FormError[] => {
  const errors = []
  if (!form.value.firstName) errors.push({ name: 'firstName', message: 'обязательное поле' })
  if (!form.value.lastName) errors.push({ name: 'lastName', message: 'обязательное поле' })
  if (!form.value.attendance) errors.push({ name: 'attendance', message: 'обязательное поле' })
  if (!form.value.transferHelp && form.value.attendance === 'да') errors.push({ name: 'transferHelp', message: 'обязательное поле' })
  if (!form.value.drinks.length && form.value.attendance === 'да') errors.push({ name: 'drinks', message: 'обязательное поле' })
  return errors
}

const submitForm = async () => {
  try {
    loading.value = true
    status.value = 'Туц-туц, лапка вверх — сохраняем ответ'
    const res = await fetch('/api/send-form-to-sheets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    const data = await res.json()
    if (data.success) {
      status.value = 'Туц-туц, лапка вверх — сохраняем ответ'
      statusColor.value = 'green'
      form.value = {
        firstName: null,
        lastName: null,
        attendance: null,
        transferHelp: null,
        drinks: []
      }
    } else {
      status.value = 'Мурр, что-то пошло не так!'
      statusColor.value = 'red'
    }
  } catch (error) {
    status.value = 'Мурр, что-то пошло не так!'
    statusColor.value = 'red'
  }
  loading.value = false
}

const ui = {
  item:"text-[1.5rem]/[1.2] py-1",
}
</script>


<style scoped lang="scss">
</style>
