export function useScrollThreshold(px: number = 300) {
  const isVisible = ref(false)

  onMounted(() => {
    const handler = () => {
      isVisible.value = window.scrollY > px
    }
    window.addEventListener('scroll', handler, { passive: true })
    onUnmounted(() => window.removeEventListener('scroll', handler))
  })

  return { isVisible }
}
