<template>
  <div>
    <div class="container">
      <div class="wrapper">
        <div class="login-form">
          <h1 class="lf-h1">Welcome To Sofii!</h1>
          <form @submit.prevent="handleSubmit">
            <div class="inp-box">
              <input
                v-model="username"
                type="text"
                placeholder="Username"
              />
              <i class="fa fa-user icon"></i>
              <span v-if="errors.username" class="val-error">{{ errors.username }}</span>
            </div>
            <div class="inp-box">
              <input
                v-model="email"
                type="email"
                placeholder="Email"
              />
              <i class="fa fa-envelope icon"></i>
              <span v-if="errors.email" class="val-error">{{ errors.email }}</span>
            </div>
            <div class="inp-box">
              <input
                v-model="password"
                type="password"
                placeholder="Secure Password"
              />
              <i class="fa fa-lock icon"></i>
              <span v-if="errors.password" class="val-error">{{ errors.password }}</span>
            </div>
            <div class="btn-box">
              <button type="submit">
                Register
                <i class="fa fa-arrow-right"></i>
              </button>
            </div>
            <div class="form-links">
              <div @click="router.push('/login')">
                <a href="">Already Have An Account?</a>
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
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useRouter } from 'vue-router';
import { apiService } from '@/api/ApiService';
import { usePost } from '@/composables/usePost';

interface RegisterFormValues {
  username: string;
  password: string;
  email: string;
}

export default {
  name: 'RegisterForm', 
  setup() {
    const router = useRouter();
    const validationSchema = yup.object({
      username: yup.string().required("Username required"), 
      email: yup.string().email("Invalid email").required("Email required"),
      password: yup.string().min(6, "Password must have at least 6 chars").required("Password required"),
    });

    const { handleSubmit, errors } = useForm<RegisterFormValues>({
      validationSchema,
    });

    const { value: username } = useField("username"); 
    const { value: email } = useField("email");
    const { value: password } = useField("password");
    
    const { mutate } = usePost<RegisterFormValues>({
      serviceFunc: (data: RegisterFormValues) => apiService.post('/auth/register', data),
      successFunc: () => router.push({ name: "home"}), 
      withError: true,
      withLoading: true,
    });

    const onSubmit = async (values: RegisterFormValues) => {
      console.log("Form submitted:", values);
      await mutate(values); 
    };

    return {
      email,
      password,
      username, 
      errors,
      router,
      handleSubmit: handleSubmit(onSubmit),
    };
  },
};
</script>

<style scoped src="./RegisterForm.css"></style>