<template>
  <div class="container">
    <div class="wrapper">
      <div class="login-form">
        <h1 class="lf-h1">Welcome Back To Sofii</h1>
        
        <form @submit.prevent="handleSubmit">
          <div class="inp-box">
            <input v-model="email" placeholder="Enter Your Email" id="inp1" type="email" required>
            <i class="fa fa-envelope"></i>
          </div>
          <div class="inp-box">
            <input v-model="password" placeholder="Enter Your Password" id="inp2" type="password" required>
            <i class="fa fa-lock"></i>
          </div>

          <div class="btn-box">
            <button type="submit">
              Login
            </button>
          </div>
          
          <div class="form-links">
            <div> 
               <p @click.prevent="$router.push({ name: 'sendResetPassword' })">Forgot Your Password ?</p>
            </div>
            <div>
              <p @click="$router.push({ name: 'register'})">Dont have an account ?</p>
            </div>
          </div>
        </form>
      </div>
      
      <div class="login-social-media"> 
        <div class="social-buttons">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { apiService } from '@/api/ApiService';
import { usePost } from '@/composables/usePost';

interface LoginFormValues {
  email: string;
  password: string;
}

export default defineComponent({
  name: 'LoginForm',
  components: {
  }, 
  setup() {
    const router = useRouter();
    const loading = ref(false);

    const validationSchema = yup.object({
      email: yup.string().email("Invalid email").required("Email required"),
      password: yup.string().min(6, "Password must have at least 6 chars").required("Password required"),
    });

    const { handleSubmit, errors } = useForm<LoginFormValues>({
      validationSchema,
    });

    const { value: email } = useField('email');
    const { value: password } = useField('password');

    const { mutate } = usePost<LoginFormValues>({
      serviceFunc: (data: LoginFormValues) => apiService.post('/auth/login', data),
      successFunc: (response: any) => {
        localStorage.setItem('userId', response.userId);
        router.push({ name: "home" })
      },
      withError: true,
      withLoading: true,
    });

    const onSubmit = async (values: LoginFormValues) => {
      console.log("Form submitted:", values);
      loading.value = true;
      await mutate(values);
      loading.value = false;
    };

    return {
      email,
      password,
      errors,
      handleSubmit: handleSubmit(onSubmit),
      loading,
    };
  },
});
</script>

<style scoped src="./LoginForm.css">
</style>