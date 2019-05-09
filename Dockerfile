FROM alpine:3.9
RUN echo "add a run command" > /tmp/build
RUN echo "add a run command" > /tmp/build

FROM alpine:3.9
COPY echo --from=0 /tmp/build /tmp/build
COPY echo --from=0 /tmp/build /tmp/build
CMD ["sh"]