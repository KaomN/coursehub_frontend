<template>
    <BNavbar toggleable="lg" class="custom-navbar">
        <BNavbarBrand href="#" class="colored-name">CourseHub</BNavbarBrand>
        <BNavbarToggle target="nav-collapse" />
        <BCollapse id="nav-collapse" is-nav>
            <BNavbarNav>
                <BNavItem><router-link to="/courses" class="mr-1">Courses</router-link></BNavItem>
                <BNavItem><router-link to="/mycourses" >My Courses</router-link></BNavItem>
            </BNavbarNav>
            <BNavForm class="d-flex">
                <div class="search-wrapper">
                    <BFormInput class="custom-search" placeholder="What do you want to learn?" />
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="custom-search-icon" />
                </div>
            </BNavForm>
            <BNavbarNav class="ms-auto mb-2 mb-lg-0">
                <BNavItem>Login</BNavItem>
                <div class="signup-link" @click="signup">Join for Free</div>
            </BNavbarNav>
        </BCollapse>
    </BNavbar>
</template>

<script>
    export default {
        name: 'NavBar',
        data() {
        return {

        }
        },
        computed: {
        },
        methods: {
            goToHome() {
                this.$router.push("/")
            }
        },
        actions: {
            signup() {

            }
        },
        mounted() {
        }
    }
</script>


<style scoped lang="scss">
nav {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem 0.5rem 0.75rem;
    margin-bottom: 1rem;
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(219, 219, 219);
}
nav a {
  font-weight: bold;
  color: black;
  text-decoration: none;
}
nav a.router-link-exact-active {
  color: #14234b;
}
h3 {
    margin: unset;
    margin-right: 1rem;
}
.header-btn {
    cursor: pointer;
    user-select: none;
}
.custom-search{
    background-color: rgb(255, 255, 255);
    border-radius: 1rem;
    padding-right: 4rem;
    margin-left: 2rem;
}
.colored-name {
    color: #0d6efd;
}
.search-wrapper {
    position: relative;
}
.custom-search-icon {
    position: absolute;
    right: -1.3rem;
    top: 10px;
    cursor: pointer;
}
.signup-link {
    display: flex;
    align-items: center;
    padding-left: 0.45rem;
    padding-right: 0.45rem;
    margin-left: 1rem;
    border: 1px solid #0d6efd;
    border-radius: 0.5rem;
    color: rgba(0,0,0,0.65);
    cursor: pointer;
    user-select: none; /* Non-standard syntax (for most browsers) */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    &:hover {
        color: rgba(0,0,0,0.85);
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
    }
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}
</style>
