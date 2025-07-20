<template>
  <div class="max-w-xl mx-auto w-full space-y-6">
    <h2 class="text-2xl font-semibold text-center">Анкета, чтобы всё прошло красиво</h2>

    <UForm :validate="validate" :state="form" class="space-y-4" @submit="submitForm">
      <UFormField  label="Имя" name="firstName" required>
        <UInput v-model="form.firstName" class="w-full" placeholder="Ваше имя" />
      </UFormField >

      <UFormField  label="Фамилия" name="lastName" required>
        <UInput v-model="form.lastName" class="w-full" placeholder="Ваша фамилия" />
      </UFormField >

      <UFormField  label="Сможете ли вы быть с нами в этот день?" name="attendance" required>
        <URadioGroup v-model="form.attendance" :items="attendanceOptions" />
      </UFormField >

      <UFormField  label="Нужна ли вам помощь с трансфером?" name="transferHelp" required>
        <URadioGroup v-model="form.transferHelp" :items="transferOptions" />
      </UFormField >

      <UFormField  label="Уточните предпочтения по напиткам" name="drinks" required>
        <UCheckboxGroup v-model="form.drinks" :items="drinkOptions" />
      </UFormField >

      <UButton type="submit" color="primary" :loading="loading" size="xl" class="w-full justify-center">Отправить</UButton>
    </UForm>

    <UAlert v-if="status" :color="statusColor" :title="status" />
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
  { label: 'Да, конечно!', value: 'да' },
  { label: 'Увы, не получится :(', value: 'нет' }
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
  if (!form.value.transferHelp) errors.push({ name: 'transferHelp', message: 'обязательное поле' })
  if (!form.value.drinks.length) errors.push({ name: 'drinks', message: 'обязательное поле' })
  return errors
}

const submitForm = async () => {
  console.log(form.value)
  try {
    loading.value = true
    const res = await fetch('/api/send-form-to-sheets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    const data = await res.json()
    if (data.success) {
      status.value = 'Спасибо! Ваш ответ записан.'
      statusColor.value = 'green'
      // form.value = {
      //   firstName: null,
      //   lastName: null,
      //   attendance: null,
      //   transferHelp: null,
      //   drinks: []
      // }
    } else {
      status.value = 'Ошибка при отправке.'
      statusColor.value = 'red'
    }
  } catch (error) {
    status.value = 'Ошибка сети.'
    statusColor.value = 'red'
  }
  loading.value = false
}
</script>


<style scoped lang="scss">
</style>
